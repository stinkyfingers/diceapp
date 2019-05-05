provider "aws" {
  profile = "jds"
  region = "us-west-1"
}

resource "aws_s3_bucket" "dice" {
  bucket = "dice.john-shenk.com"
  acl = "public-read"
  website {
   index_document = "index.html"
   error_document = "index.html"
 }
  policy = <<EOF
{
"Version":"2012-10-17",
"Statement":[
  {
    "Sid":"PublicReadForGetBucketObjects",
    "Effect":"Allow",
    "Principal":"*",
    "Action":"s3:GetObject",
    "Resource":"arn:aws:s3:::dice.john-shenk.com/*"
  }]
}
EOF
}

resource "aws_route53_record" "dice" {
  zone_id = "Z3P68RXJ4VECYX"
  name    = "dice.john-shenk.com"
  type    = "A"

  alias {
    name                   = "${aws_s3_bucket.dice.website_domain}"
    zone_id                = "${aws_s3_bucket.dice.hosted_zone_id}"
    evaluate_target_health = false
  }
}


# resource "aws_iam_role" "dice" {
#   name = "dice_pipeline_role"
#   assume_role_policy = <<EOF
# {
#   "Version": "2012-10-17",
#   "Statement": [
#     {
#       "Effect": "Allow",
#       "Principal": {
#         "Service": "codepipeline.amazonaws.com"
#       },
#       "Action": "sts:AssumeRole"
#     }
#   ]
# }
# EOF
# }
#
# resource "aws_iam_role_policy" "dice" {
#   name = "dice_pipeline_policy"
#   role = "${aws_iam_role.dice.id}"
#   policy = <<EOF
# {
#   "Version": "2012-10-17",
#   "Statement": [
#     {
#       "Effect":"Allow",
#       "Action": [
#         "s3:Get*",
#         "s3:List*",
#         "s3:PutObject"
#       ],
#       "Resource": [
#         "${aws_s3_bucket.dice.arn}",
#         "${aws_s3_bucket.dice.arn}/*"
#       ]
#     },
#     {
#       "Effect": "Allow",
#       "Action": [
#         "codebuild:BatchGetBuilds",
#         "codebuild:StartBuild"
#       ],
#       "Resource": "*"
#     },
#     {
#       "Effect": "Allow",
#       "Action": [
#         "codepipeline:*"
#       ],
#       "Resource": "*"
#     }
#   ]
# }
# EOF
# }

# resource "aws_codepipeline" "diceapp" {
#   name = "diceapp"
#   role_arn = "${aws_iam_role.dice.arn}"
#
#   artifact_store {
#     location = "${aws_s3_bucket.dice.bucket}"
#     type     = "S3"
# }
#
#   stage {
#     name = "Source"
#
#     action {
#       name = "Source"
#       category = "Source"
#       owner = "ThirdParty"
#       provider = "Github"
#       version = "1"
#       output_artifacts = ["dice_output"]
#
#       configuration {
#         Owner = "stinkyfingers"
#         Repo = "diceapp"
#         Branch = "master"
#         OAuthToken = ""// TODO
#       }
#     }
#   }
#   stage {
#     name = "Build"
#
#     action {
#       name = "Build"
#       category = "Build"
#       owner = "AWS"
#       provider = "CodeBuild"
#       input_artifacts = ["dice_output"]
#       version = "1"
#
#       configuration {
#         ProjectName = "dice"
#       }
#     }
#   }
# }
#

# remote state backend
# terraform {
#   backend "s3" {
#     bucket = "dice-state"
#     key    = "terraform.tfstate"
#     region = "us-west-1"
#   }
# }


# resource "aws_iam_policy" "dice_backend" {
#   name = "dice_backend"
#   policy = <<EOF
#   {
#     "Version": "2012-10-17",
#     "Statement": [
#       {
#         "Effect": "Allow",
#         "Action": "s3:ListBucket",
#         "Resource": "arn:aws:s3:::dice-state"
#       },
#       {
#         "Effect": "Allow",
#         "Action": ["s3:GetObject", "s3:PutObject"],
#         "Resource": "arn:aws:s3:::dice-state/terraform.tfstate"
#       }
#     ]
#   }
# EOF
# }



# resource "aws_iam_role" "dice_build" {
#   name = "codebuild-diceapp-service-role"
#   assume_role_policy = <<EOF
# {
#   "Version": "2012-10-17",
#   "Statement": [
#     {
#       "Effect": "Allow",
#       "Principal": {
#         "Service": "codepipeline.amazonaws.com"
#       },
#       "Action": "sts:AssumeRole"
#     }
#   ]
# }
# EOF
# }
#
# resource "aws_iam_role_policy" "dice_build_policy" {
#   name = "dice_pipeline_policy"
#   role = "${aws_iam_role.dice_build.id}"
#   policy = <<EOF
# {
#     "Version": "2012-10-17",
#     "Statement": [
#         {
#             "Effect": "Allow",
#             "Action": [
#                 "s3:Get*",
#                 "s3:List*",
#                 "s3:PutObject"
#             ],
#             "Resource": [
#                 "arn:aws:s3:::dice.john-shenk.com",
#                 "arn:aws:s3:::dice.john-shenk.com/*"
#             ]
#         }
#     ]
# }
# EOF
# }
