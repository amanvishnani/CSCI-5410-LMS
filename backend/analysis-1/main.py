import os
import tempfile
from werkzeug.utils import secure_filename
from google.cloud import storage
from flask import jsonify

headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Credentials': 'true'
}
bucket_name = 'group3-analysis-1'
client = storage.Client()
bucket = client.get_bucket(bucket_name)

# Helper function that computes the filepath to save files to
def get_file_path(filename):
    # Note: tempfile.gettempdir() points to an in-memory file system
    # on GCF. Thus, any files in it must fit in the instance's memory.
    file_name = secure_filename(filename)
    return os.path.join(tempfile.gettempdir(), file_name)


def uploadFile(request):

    # This code will process each non-file field in the form
    if request.method == 'OPTIONS':
        # Allows GET requests from origin https://mydomain.com with
        # Authorization header
        return ('', 204, headers)

    fields = {}
    data = request.form.to_dict()
    for field in data:
        fields[field] = data[field]
    
    # This code will process each file uploaded
    files = request.files.to_dict()
    for file_name, file in files.items():
        # Note: GCF may not keep files saved locally between invocations.
        # If you want to preserve the uploaded files, you should save them
        # to another location (such as a Cloud Storage bucket).
        local_file_path = get_file_path(file_name)
        blob = bucket.blob(file_name)
        file.save(local_file_path)
        blob.upload_from_filename(filename=local_file_path)
    
    # Clear temporary directory
    for file_name in files:
        file_path = get_file_path(file_name)
        os.remove(file_path)

    resp = {
        'message': "OK"
    }
    return (jsonify(resp), 200, headers)

def listFiles(request):
    if request.method == 'OPTIONS':
        # Allows GET requests from origin https://mydomain.com with
        # Authorization header
        return ('', 204, headers)
    
    blobs = client.list_blobs(bucket_name)
    files = list()
    for blob in blobs:
        fileObj = dict()
        fileObj['name'] = blob.name
        fileObj['metadata'] = blob.metadata
        files.append(fileObj)

    resp = {
        'files': files 
    }
    return (jsonify(resp), 200, headers)