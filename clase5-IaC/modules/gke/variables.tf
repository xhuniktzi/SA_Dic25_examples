variable "project_id" {
  type = string
}

variable "cluster_name" {
  type = string
}

variable "region" {
  type = string
}

variable "zone" {
  type = string
}

variable "network_name" {
  type = string
  default = "gke-net"
}

variable "subnet_name" {
  type = string
  default = "gke-subnet"
}

variable "subnet_cidr" {
    type = string
    default = "10.10.0.0/16"
}

variable "pods_cidr" {
  type = string
  default = "10.20.0.0/16"
}

variable "services_cidr" {
  type = string
  default = "10.30.0.0/20"
}

variable "machine_type" {
  type = string
  default = "e2-standard-2"
}

variable "disk_type" {
  type = string
  default = "pd-standard"
}

variable "disk_size_gb" {
  type = number
  default = 30
}

variable "min_nodes" {
  type = number
  default = 1
}

variable "max_nodes" {
  type = number
  default = 5
}