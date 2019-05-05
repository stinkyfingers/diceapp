variable "vpc" {
  type    = "string"
  default = "vpc-8f644ae8"
}


variable "default_security_group" {
  type    = "string"
  default = "sg-0a501271"
}

variable "subnets" {
  type    = "list"
  default = ["subnet-7e564f19","subnet-df8ba184"]
}
