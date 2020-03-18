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
    name                   = "${aws_cloudfront_distribution.dice.domain_name}"
    zone_id                = "Z2FDTNDATAQYW2"
    evaluate_target_health = false
  }
}

resource "aws_cloudfront_origin_access_identity" "dice" {
  comment = "dice.john-shenk.com identity"
}

locals {
  s3_origin_id = "flashcards-origin"
}

resource "aws_cloudfront_distribution" "dice" {
  origin {
    domain_name = "${aws_s3_bucket.dice.bucket_domain_name}"
    origin_id   = "${local.s3_origin_id}"
    s3_origin_config {
      origin_access_identity = "${aws_cloudfront_origin_access_identity.dice.cloudfront_access_identity_path}"
    }
  }

  enabled             = true
  is_ipv6_enabled     = true

  aliases = ["dice.john-shenk.com"]

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "${local.s3_origin_id}"
    trusted_signers = []

    forwarded_values {
      query_string = false
      query_string_cache_keys = []
      headers = []

      cookies {
        forward = "none"
        whitelisted_names = []
      }
    }

    viewer_protocol_policy = "allow-all"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 31536000
  }
  restrictions {
    geo_restriction {
        locations        = []
        restriction_type = "none"
    }
}

  viewer_certificate {
      acm_certificate_arn            = "arn:aws:acm:us-east-1:671958020402:certificate/87283675-eede-49c0-b322-4f0315c87441"
      cloudfront_default_certificate = false
      minimum_protocol_version       = "TLSv1.1_2016"
      ssl_support_method             = "sni-only"
  }
}
