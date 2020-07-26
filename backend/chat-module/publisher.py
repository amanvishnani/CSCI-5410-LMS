import time
from google.cloud import pubsub_v1
import json
from google.cloud import storage
import uuid

# TODO(developer)
project_id = "testproject-277421"
topic_id = "trial"

publisher = pubsub_v1.PublisherClient()
topic_path = publisher.topic_path(project_id, topic_id)

futures = dict()
headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '3600',
}


def get_callback(f, data):
    def callback(f):
        try:
            print(f.result())
            futures.pop(data)
        except:  # noqa
            print("Please handle {} for {}.".format(f.exception(), data))

    return callback


def hello_world(request):

    try:
        data = request.data
        if(data != ''):

            data = str(data)

            data = data[2:len(data)-1]

            if(data != ''):
                futures.update({data: None})
                # When you publish a message, the client returns a future.
                future = publisher.publish(
                    # data must be a bytestring.
                    topic_path, data=data.encode("utf-8")
                )
                futures[data] = future
                # Publish failures shall be handled in the callback function.
                future.add_done_callback(get_callback(future, data))

                # Wait for all the publish futures to resolve before exiting.
                while futures:
                    time.sleep(5)

                print("Published message with error handler.")

                data_as_obj = json.loads(data)

                orgId = data_as_obj['message']['orgId']
                orgId = str(orgId)

                t = time.localtime()

                yr = time.strftime("%Y", t)
                hr = time.strftime("%H", t)
                min = time.strftime("%M", t)
                mon = time.strftime("%m", t)
                day = time.strftime("%d", t)
                file_name = day + mon + yr + hr + min + '.json'
                file_name_check = orgId + '/' + day + mon + yr + hr

                bucket_name = "chatmessages"
                client = storage.Client(
                    project=project_id)
                bucket = client.get_bucket(bucket_name)

                content_from_bucket = ''
                content_as_dict = []

                for blob in client.list_blobs(bucket_name, prefix=file_name_check):
                    content_from_bucket = blob.download_as_string()
                    file_name = blob.name
                    file_name_arr = file_name.split('/')
                    if len(file_name_arr) > 1:
                        file_name = file_name_arr[1]

                if content_from_bucket != '':
                    content_as_str = str(content_from_bucket)
                    length = len(content_as_str) - 1
                    content_as_str = content_as_str[2:length]
                    content_as_dict = json.loads(content_as_str)

                id = uuid.uuid1()

                idstr = str(id)

                data_as_obj['message']['id'] = idstr

                content_as_dict.append(data_as_obj)

                print('content_as_dict', content_as_dict)

                if len(content_as_dict) > 0:
                    blob = bucket.blob(orgId+'/'+file_name)
                    file_name = '/tmp/' + file_name
                    print('file_name before open', file_name)
                    with open(file_name, 'w') as outfile:
                        json.dump(content_as_dict, outfile)
                    blob.upload_from_filename(file_name)

            return ('Success', 200, headers)

        else:
            return('Failed', 400, headers)
    except Exception as e:
        print('exception', e)
        return('Failed', 400, headers)
