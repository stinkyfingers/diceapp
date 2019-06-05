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
