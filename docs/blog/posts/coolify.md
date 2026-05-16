---
authors:
  - tomas
categories:
  - Tech
tags:
  - guide
  - coolify
  - gdg
date:
  created: 2026-05-16
  updated: 2026-05-16
draft: false
comments: true
---

# Build with AI

Post sobre a minha apresentação em português no GDG!

<!-- more -->

## Aviso (Disclaimer)

This post is probably going to be one of the few written in Portuguese, sorry English readers.

Devido ao tempo, o blog tem videos. O meu objetivo seria deixar sem videos, e tudo explicado do meu jeito em portuguese (com os videos como referencia no final.)

## Link da Apresentação

- [Apresentação no Canva](https://buildwithaitomas.my.canva.site/)

## Como Configurar o Proxmox?

Siga o guia do vídeo abaixo até o minuto **3:10**:

<iframe width="560" height="315" src="https://www.youtube.com/embed/kqZNFD0JNBc?si=7KBqy7gSFvArGlob" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Depois de instalar, como você viu no vídeo (ou na sua própria máquina), vai aparecer um popup. Para resolver isso, recomendo utilizar o seguinte script:

[Proxmox VE Post Install Script](https://community-scripts.org/categories?category=proxmox-and-virtualization&preview=post-pve-install)

é só pegar e rodar ele aqui, dentro do Pve -> Shell

![Shell Screenshot](./image/coolify/Screenshot%202026-05-14%20at%2015.41.19.png)

Ele vai atualizar o sistema, tirar o popup de erro e deixar a máquina prontinha para você brincar.

## Aplicativos

Aqui vou listar todos os apps que configurei no Proxmox. De qualquer forma, recomendo muito que você tente aprender a fazer a configuração por conta própria!

### Coolify

- [Script de Instalar Coolify](https://community-scripts.org/scripts/coolify)
- [Documentação Oficial do Coolify](https://coolify.io/docs/applications/)

## Acessos

Agora para acessar seus Aplicativos fora do seu network, você vai precisar fazer um dos três jeitos.

### Cloudflare & Coolify

Antes de usar Cloudflare & Coolify, vai precisar de um domínio, recomendo [Registro.br](https://registro.br/), você consegue comprar .com.br dominios por 40 reais ao ano, caso gostaria outro tipos de dominio recomendo [Porkbun](https://porkbun.com).

Para configurar os túneis do Cloudflare com o Proxmox e o Coolify, siga este guia oficial: [Cloudflare Tunnels no Coolify](https://coolify.io/docs/knowledge-base/cloudflare/tunnels/all-resource).

Aqui estão dois pontos que fiz diferente na minha configuração:

1. Troquei o `host.docker.internal` pelo IP local onde o painel está hospedado (no meu caso, `192.168.1.111`).
2. Mudei o domínio wildcard de `https` para `http`.

No final, ficou assim:

![Screenshot da configuração Coolify](image/coolify/Screenshot%202025-12-31%20at%2016.34.31.png)

E por último (e mais importante), lá no painel do Cloudflare em **DNS > Records > seu-dominio.com**, precisei adicionar o seguinte registro:

| Type  | Name          | Target                       | Proxy Status | TTL  |
| ----- | ------------- | ---------------------------- | ------------ | ---- |
| CNAME | \*.domain.com | <TUNNEL_ID>.cfargotunnel.com | Proxied      | Auto |

Com isso feito, finalmente funcionou perfeitamente!

### Tailscale

Primeiro cria um conta de graça e baixa o App no seu celular ou PC, https://login.tailscale.com/start.

Acesse a página do [Tailscale no Community Scripts](https://community-scripts.org/scripts/add-tailscale-lxc). Lá você vai encontrar o comando certinho, é só copiar e rodar no terminal do seu servidor.

![Screenshot da configuração Tailscale](image/coolify/Screenshot%202026-05-16%20at%2010.17.21.png)

Ai ele vai de perguntar onde você instala, e depois vai abrir um link para fazer login com a conta.

Com isso ja foi feito e configurado!

### Port Forwarding (Redirecionamento de Portas)

Abaixo mostro como fazer o redirecionamento de portas usando o roteador da Vivo. Se você usa outro provedor de internet e tem exemplos, deixa aí nos comentários e eu adiciono aqui no post!

#### Vivo

<iframe width="560" height="315" src="https://www.youtube.com/embed/Jgofyi6NqpM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Links Úteis

- [Proxmox Community Scripts](https://community-scripts.org/scripts)
- [Domínios](https://registro.br/)
- [Site sendo hospedado com Wii](https://blog.infected.systems/posts/2025-04-21-this-blog-is-hosted-on-a-nintendo-wii/)
- [Coolify Template NextJS](https://github.com/Shadow1363/nextjs-template)
