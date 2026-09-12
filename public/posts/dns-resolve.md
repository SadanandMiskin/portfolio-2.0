
I ran into a strange networking issue on my Ubuntu PC:

-   Connected to Wi-Fi normally.
-   Some websites opened, while others did not.
-   `ping` over IPv4/IPv6 gave inconsistent results.
-   DNS resolution itself appeared to work.

## 1. First check: DNS resolution

I used `resolvectl`:

``` bash
resolvectl query google.com
```

Example:

``` text
google.com: 142.251.221.206                    -- link: wlp4s0
            2404:6800:4007:831::200e           -- link: wlp4s0
```

This confirmed that DNS was returning both:

-   **A record** → IPv4 address
-   **AAAA record** → IPv6 address

For some websites, only an IPv4 address was returned.

> **Important:** A website not having an IPv6 address is not, by itself,
> a reason for the website to fail. A browser can use IPv4 when IPv6 is
> unavailable. The real problem turned out to be routing.

## 2. Check the routing table

I checked the IPv4 routes:

``` bash
ip route
```

There was **no IPv4 default route**.

But IPv6 had a default route:

``` bash
ip -6 route
```

So the situation was roughly:

``` text
             Ubuntu
                |
             Wi-Fi
             wlp4s0
                |
        +-------+-------+
        |               |
      IPv4            IPv6
        |               |
   ❌ No default     ✅ Default
      route             route
```

This explained the confusing behavior: DNS could resolve the website's
IPv4 address, but the system did not have a default IPv4 route to send
packets toward the Internet.

## 3. Verify the Wi-Fi connection

``` bash
nmcli device status
```

Output:

``` text
DEVICE          TYPE      STATE                   CONNECTION
wlp4s0          wifi      connected               myWifi
lo              loopback  connected (externally)  lo
p2p-dev-wlp4s0  wifi-p2p  disconnected            --
enp3s0          ethernet  unavailable             --
```

The Wi-Fi interface was connected, so the next thing to fix was the
missing IPv4 route.

## 4. Add the IPv4 default route

My router/gateway was:

``` text
192.168.0.1
```

I added the missing default route:

``` bash
sudo ip route add default via 192.168.0.1 dev wlp4s0
```

After adding the route, IPv4 traffic had a path to the gateway and the
affected websites became reachable.

## The troubleshooting flow

``` text
Website not opening
        ↓
Check connectivity
        ↓
Check DNS
resolvectl query example.com
        ↓
DNS resolves → check routing
        ↓
ip route
        ↓
No IPv4 default route
        ↓
Add default route
        ↓
IPv4 traffic can reach the gateway
```

## Key takeaway

**DNS resolution and routing are two different things.**

`resolvectl` can successfully resolve a hostname to an IP address, while
the machine can still be unable to reach that IP.

When troubleshooting:

``` text
DNS → "What IP address?"
Routing → "Where should I send the packet?"
```

A successful DNS lookup does **not** guarantee network connectivity.

### Useful commands

``` bash
resolvectl query example.com
ip addr
ip route
ip -6 route
nmcli device status
ip route get 8.8.8.8
```

> **Note:** `ip route add` changes the route temporarily. NetworkManager
> may recreate the connection without this route after reconnecting or
> rebooting. For a permanent fix, the default gateway should normally be
> configured in the NetworkManager connection profile.
