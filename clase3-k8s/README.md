# K8s

## Crear cluster en google cloud

```bash
gcloud container clusters create test-cluster-sa --zone=us-central1-a --enable-autoscaling --min-nodes=1 --max-nodes=3 --num-nodes=1 --machine-type=e2-medium --disk-type=pd-standard --disk-size=30 --enable-ip-alias --enable-autoupgrade --enable-autorepair
```

Despues tienes que instalar gke-gcloud-auth-plugin en:

- <https://cloud.google.com/kubernetes-engine/docs/how-to/cluster-access-for-kubectl#install_plugin>

```bash
gcloud container clusters get-credentials test-cluster-sa --zone=us-central1-a
```
