gcloud builds submit --tag gcr.io/csci-5410-av/user-management
gcloud run deploy --image gcr.io/csci-5410-av/user-management --platform managed