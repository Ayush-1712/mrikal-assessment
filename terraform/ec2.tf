resource "aws_instance" "test_instance" {
  ami           = "ami-05c179eced2eb9b5b"  
  instance_type = "t2.micro"

  tags = {
    Name = "test-instance"
  }
}