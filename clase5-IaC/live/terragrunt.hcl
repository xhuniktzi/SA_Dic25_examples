locals {
  project_id     = "winged-idiom-479603-a7"
  tfstate_bucket = "winged-idiom-479603-a7-tfstate-prod"
  tfstate_prefix = "terragrunt"
}

remote_state {
  backend = "gcs"
  config = {
    bucket = local.tfstate_bucket
    prefix = "${local.tfstate_prefix}/${path_relative_to_include()}"
  }
  generate = {
    path      = "backend.tf"
    if_exists = "overwrite_terragrunt"
  }
}

generate "provider" {
  path      = "provider.tf"
  if_exists = "overwrite_terragrunt"
  contents  = <<EOF
provider "google" {
  project = "${local.project_id}"
}
EOF
}
