---
authors:
  - tomas
categories:
  - Tech
tags:
  - guide
  - coolify
date:
  created: 2025-12-31
  updated: 2025-12-14
draft: true
comments: true
---

# Coolify 101

Coolify Home Setup with Proxmox & Cloudflare

<!-- more -->

Happy new year, this year i'm gonna be posting more blog posts

## Cloudflare

To set up Cloudflare, follow the following guide: https://coolify.io/docs/knowledge-base/cloudflare/tunnels/all-resource, I also wrote down some extra configuration I had to do to:

So I don't know if I'm doing something wrong but the documentation DID NOT help completely for me, here's what I had to change:

1. `host.docker.internal`, I swapped it to the localhost IP where the panel is being hosted, in my case `192.168.1.111`.

2. Swap the wildcard domain to be `http` and not `https`.

In the end it looked like this:

![1748710944420](image/coolify/Screenshot%202025-12-31%20at%2016.34.31.png)

And lastly (and most importantly) on Cloudflare -> DNS -> Records -> domain.com, I had to add the following record:

| Type  | Name          | Target                       | Proxy Status | TTL  |
| ----- | ------------- | ---------------------------- | ------------ | ---- |
| CNAME | \*.domain.com | <TUNNEL_ID>.cfargotunnel.com | Proxied      | Auto |

With that done it finally worked!

And to host the panel,
