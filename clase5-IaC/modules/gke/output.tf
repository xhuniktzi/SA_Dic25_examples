output "cluster_name" {
  value = google_container_cluster.gke.name
}

output "zone" {
  value = var.zone
}

output "region" {
  value = var.region
}

output "project_id" {
  value = var.project_id
}

output "get_credentials_command" {
    value = "gcloud container clusters get-credentials ${google_container_cluster.gke.name} --zone ${var.zone} --project ${var.project_id}"
}