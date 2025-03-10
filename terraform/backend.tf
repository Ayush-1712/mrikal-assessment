
terraform {
  backend "s3" {
    bucket         = "mrikal-assessment-backend"
    key            = "test/terraform.tfstate"
    region         = "ap-south-1"
    dynamodb_table = "mrikal-terraform-lock"
    encrypt        = true
  }
}