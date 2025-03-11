resource "aws_key_pair" "demo_key" {
  key_name   = "demo-key"
  public_key = file("~/.ssh/demo-key.pub")
}

resource "aws_instance" "test_instance" {
  ami           = "ami-00bb6a80f01f03502"  
  instance_type = "t2.micro"
  key_name = aws_key_pair.demo_key.key_name

  tags = {
    Name = "test-instance"
  }
}