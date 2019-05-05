resource "aws_iam_role" "diceapp_build" {
  name = "diceapp_build"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "codebuild.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}
resource "aws_iam_role_policy" "diceapp_build" {
  role = "${aws_iam_role.diceapp_build.name}"

  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Resource": [
        "*"
      ],
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "ec2:CreateNetworkInterface",
        "ec2:DescribeDhcpOptions",
        "ec2:DescribeNetworkInterfaces",
        "ec2:DeleteNetworkInterface",
        "ec2:DescribeSubnets",
        "ec2:DescribeSecurityGroups",
        "ec2:DescribeVpcs"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:*"
      ],
      "Resource": [
        "${aws_s3_bucket.dice.arn}",
        "${aws_s3_bucket.dice.arn}/*"
      ]
    }
  ]
}
POLICY
}

resource "aws_codebuild_project" "diceapp" {
  name          = "diceapp"
  description   = "diceapp"
  build_timeout = "5"
  service_role  = "${aws_iam_role.diceapp_build.arn}"

  artifacts {
    type = "NO_ARTIFACTS"
  }

  cache {
    type     = "S3"
    location = "${aws_s3_bucket.dice.bucket}"
  }

  environment {
    compute_type                = "BUILD_GENERAL1_SMALL"
    image                       = "aws/codebuild/standard:2.0"
    type                        = "LINUX_CONTAINER"
    image_pull_credentials_type = "CODEBUILD"

    # environment variables go here
  }

  source {
    type            = "GITHUB"
    location        = "https://github.com/stinkyfingers/diceapp.git"
    git_clone_depth = 1
  }

  vpc_config {
    vpc_id = "${var.vpc}"

    subnets = "${var.subnets}"

    security_group_ids = [
      "${var.default_security_group}"
    ]
  }

  tags = {
    "Environment" = "Prod"
  }
}

resource "aws_codebuild_webhook" "diceapp" {
  project_name = "${aws_codebuild_project.diceapp.name}"
}
