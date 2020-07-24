import os
import tempfile
from werkzeug.utils import secure_filename
from google.cloud import storage
from flask import jsonify
import pickle

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


def analyzeFileName(data, context):
    print('Bucket: {}'.format(data['bucket']))
    print('File: {}'.format(data['name']))
    uploaded_file_name = data['name']
    model = load_object('model.pkl')
    vectorizer = load_object('vectorizer.pkl')
    matr = vectorizer.transform([uploaded_file_name])
    res = model.predict(matr)
    center_number = res[0]
    centeroides = model.cluster_centers_[center_number]
    metadata = {
        'center_number': center_number,
        'centeroides': str(centeroides)
    }
    blob = bucket.blob(uploaded_file_name)
    blob.metadata = metadata
    blob.patch()

    

def download_file(file_name, file_path):
    bucket = client.bucket('kmeans-train-data')
    blob = bucket.blob(file_name)
    blob.download_to_filename(file_path)
    return 

def load_object(file_name):
    file_path = get_file_path(file_name)
    download_file(file_name, file_path)
    with open(file_path, 'rb') as pickle_file:
        obj = pickle.load(pickle_file)
        return obj