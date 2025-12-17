variable "project_id" {
  description = "The GCP project ID where the state bucket will be created."
  type        = string
  default = "winged-idiom-479603-a7"
}

variable "bucket_name" {
  description = "The name of the GCP storage bucket for the state."
  type        = string
}

variable "location" {
  type = string
    description = "The location where the bucket will be created."
    default = "US"
}
