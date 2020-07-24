from google.cloud import storage


project_id = "testproject-277421"


bucket_name = "chatmessages"


client = storage.Client(
    project=project_id)
bucket = client.get_bucket(bucket_name)
