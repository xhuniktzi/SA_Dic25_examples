provider "google" {
  project = var.project_id
}

resource "google_storage_bucket" "tfstate" {
  name = var.bucket_name
  location = var.location
  uniform_bucket_level_access = true
  versioning {
    enabled = true
  }
}