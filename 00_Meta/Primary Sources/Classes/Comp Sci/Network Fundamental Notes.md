## What is the Internet?

-   Millions of connected computing devices

    -   Hosts = end systems

    -   Running network apps

-   Communication links

    -   Fiber, copper, wireless

    -   Different transmission rates (bandwidth)

-   Packet switches forward packets (chunks of data)

-   [[Internet]]: network of networks

    -   Interconnected ISPs

-   Core of the [[internet]]: touch other routers

-   Edge of the [[internet]]: touch user devices

## What's a protocol

-   Human protocols

-   Protocols control sending and receiving of msgs

    -   TCP, IP, HTTP, 802.11

-   [[Infrastructure]] Provides services to apps

    -   Web, VoIP, email, games, e-commerce, social nets

    -   Provides programming interface to apps

        -   Hooks allow sending and receiving applications to connect to [[Internet]]

        -   Provides service options (some need to be faster/more accurate than others)

-   Protocols define the format, order of msgs sent and received among network entities, and actions taken on msg transmission, receipt

-   Network Protocols - Machines rather than humans

-   Switches and routers have no idea what data is being transmitted or why

    -   They receive a packet, read the header and forward it

    -   Apps on hosts do know

## Sending and receiving data

-   Hosts send packets of data

    -   Breaks messages into packets of length L bits

    -   Transmit packet at transmission rate (bandwidths) R

    -   Packet transmission delay = time needed to transmit l-bit packet into link = l(bits)/R(bits/sec)

-   The network core -- mesh of interconnected routers

    -   Packet-switching: hosts break application

    -   Routers store entire packet before forwarding

    -   Source -\> destination = 2L/R for 1 packet

-   Routing -- determines source destination route taken by packets

-   Forwarding - move packets from routers input to appropriate router output

-   Alternative core: circuit switching

## Packet Delay

-   d-proc:nodal processing

    -   check bit errors

    -   determine ouput link

    -   typically \<msec

-   d-queue: queueing delay

    -   time waiting at output link for transmission

    -   depends on congestions level of router

-   d-[[transgender|trans]]:transmission delay

    -   L: packet length (bits)

    -   R link bandwidth (BPS)

    -   D-[[transgender|trans]] = L/R

-   D-prop propagation delay

    -   D:length of physical link

    -   S: propagation speed in medium (\~2x10\^8 m/sec)

    -   Dprop = d/s

-   [[Internet]] Protocol Stack

    -   Application: support network apps (FTP, HTTP)

    -   Transport: process datat transfer (TCP)

    -   Network: routing of datagrams from source to destination (IP routing protocols

    -   Link: data transfer between neighboring network elements (Ethernet, 802.11 (wifi))

    -   Physical: bits 'on the wire'

## TCP and UDP

-   [[Internet]] transport protocol services

    -   TCP

        -   Reliable transport

        -   Flow control

        -   Congestion control

        -   Does not provide

        -   Connection-oriented

    -   UDP

        -   Unreliable data transfer

        -   Does not provide reliability flow control congestion control timing throughput guarantee security or connection setup

        -   Mainly used for streaming music and video where a few bits out of place wont change much

## Security

-   TCP and UDP provide no encryption

-   SSL provides encrypted TCP connection, data integrity, end-point authentication

-   SSL is an app that talks to TCP
