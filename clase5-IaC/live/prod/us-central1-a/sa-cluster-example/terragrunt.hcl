include "root" {
    path = find_in_parent_folders()
}

locals {
  project_id     = "winged-idiom-479603-a7"
  zone           = "us-central1-a"
  cluster_name  = "sa-cluster-example"
  region       = "us-central1"
}

terraform {
    source = "../../../../modules/gke"

    after_hook "kubeconfig" {
        commands = ["apply"]
        execute  = ["powershell",
        "gcloud container clusters get-credentials ${local.cluster_name} --zone ${local.zone} --project ${local.project_id}"] #--kubeconfig=./kube/config"]
    }
}

inputs = {
  project_id   = local.project_id
  region       = local.region
  zone         = local.zone
  cluster_name = local.cluster_name

  min_nodes = 1
    max_nodes = 5
    machine_type = "e2-standard-2"
    disk_type = "pd-standard"
    disk_size_gb = 30

    network_name = "gke-net-prod"
    subnet_name = "gke-subnet-prod"
}