**Chapter 1**

-   [[Internet]] vs World Wide Web

    -   [[Internet]] is a network of networks, web is a service on top of that [[infrastructure]]

-   Host/end system

    -   There is no difference you are the host when you are sending and end when you are recieving

-   Router

    -   Take the packets and send them in the direction they need to go, doesn't read

-   Link-Layer Switch (how does it perform differently from router?)

    -   Filters and forwards packets between LAN segments

-   Packet

    -   Data broken into smaller chunks

-   ISP

    -   [[Internet]] service provider

-   TCP

    -   Transmission Control Protocol

-   IP

    -   [[Internet]] protocol

-   Distributed application

    -   Application that is executed on multiple computers within a network

-   [[API]]

    -   Application program interface -- set of routines protocols and tools for building software

-   Protocol

    - 

-   Client

-   Server

-   Ethernet

-   Wifi (802.11 technology)

-   Physical [[media]] (twisted-pair wire, coax, fiber optics, radio channels

-   Store and forward transmission

    -   Router store/buffer entire packet before forwarding

-   Output queue/buffer

    -   Packets queue if in rate is higher than out rate

-   Queuing delays (causes)

    -   Processing delay -- every router/switch has to read packet header

    -   Transmission delay -- time to push every bit of packet onto the link

    -   Propagation delay -- time to physically travel over the cable/air

    -   Queuing delay -- packets get in line

-   Forwarding table

    -   table that stores where to send each packet ones the router figures out where

-   Circuit switching vs packet switching

    -   Circuit switching

-   [[Internet]] exchange point

    -   Tie ISPs together (300 in total)

-   Content provider networks

    -   Interact with all level of ISPs avoids working with higher levels because they have to pay more fees

-   Bottleneck link

    -   Link on an end to end path that constrain the throughput of the entire path

-   Protocol layers (protocol stack)

    -   know both models on page 50

    -   Be able to describe each layer

        -   Application -- support network apps (FTP, SMTP, HTTP

        -   Transport -- process data transfer (TCP, UDP)

        -   Network -- routing of datagrams from source to destination (IP, routing protocols)

        -   Link -- data transfer between neighboring network elements (ethernet, 802.111, ppp)

        -   Physical -- bits on the wire

-   Message, segment, datagram, frame

    -   Message is the actual message

    -   Segment is the information sent by TCP to control where the message goes and what it does

    -   Frame is a representation of the physical layer

-   Encapsulation -- an abstraction of how a message is sent

-   Malware -- can record keystrokes, web sites visited, upload that info

    -   Botnet -- a bunch of computers being controlled by one

    -   Virus -- [[self]] replicating infection by receiving/executing object

    -   Worm -- [[self]]-replicating infection by passively receiving object that get itself executed

-   DoS -- denial of service that targets [[computer]] or resource from one [[computer]]

-   DDoS -- a group of computers attacking one resource

-   Packet sniffing -- looking packets passing over shared connection

-   IP Spoofing -- send packet with false source address

- 

> **Chapter 2**

-   Network applications

    -   Email, web, text messaging, P2P, games, streaming, VOIP,

-   Application architecture

    -   Client-server architecture

        -   Server is an always on host with a permanent IP Address as size scales servers turn into data centers

        -   Clients communicate with the server and are not always connected. They have dynamic address and do not communicate directly with other clients

    -   P2P architecture

        -   Every peer acts as client and server, scales with amount of peers. Management is complex as IPs are changing and peers and intermittently connected

-   [[Self]]-scalability

    -   New peers bring new service capacity and new demands

-   Client process -- process that initiates communication

-   Server process process that waits to be contacted

-   SOCKET -- in between application and transport layer. Sends and receives messages

-   [[API]] (again!)

-   IP Address -- 32-bit unique address

-   Identifier -- includes ip address and port number

-   Port number

-   Reliable data transfer -- 100% of data is received in the current order without errors

-   Loss-tolerant applications -- music, video games, streaming

-   Throughput/bandwidth -- some apps require a minimum amount of throughput but others will use whatever bandwidth is available

-   Transport protocols: TCP vs UDP (services provided by each)

-   SSL -- provides encrypted TCP connection and end point authentication, can be implemented at app and socket layer

-   Application layer protocols:

-   How HTTP works

    -   Persistent vs non-persistent connections

        -   Persistent multiple objects can be sent over single TCP connection

        -   Non-persistent one object downloaded per connection

    -   Method field options

        -   GET, POST, HEAD, PUT, DELETE

    -   Cookies

        -   Kept on client managed by the browser, used for authorization, carts, recommendations

    -   Proxy server -- satisfies client requests without involving origin server by storing sites in its cache

-   FTP

    -   2 connections -- control connection port 21, data connection port 20

    -   Commands/replies -- client initiates transfer, server create connection for file transfer

-   Email protocols (how are they different/the same?)

    -   SMTP -- Simple mail transfer protocol -- user 1 sends message to mail server, mail server connects to user 2's mail server over TCP, user2 mail server delivers message

    -   POP3 -- TCP, connects to mail server and gets messages server then deletes those messages (can keep if set), mailbox is stateless across sessions , Three phases: authorization, transaction, update

    -   IMAP -- keeps all message on server, allows user organize and keeps messages across sessions, uses SMTP for delivery

-   Web based email vs using an email protocol -- Hotmail, gmail, uses HTTP instead of for access but SMTP for delivery/storage

-   DNS

    -   DNS servers -- connect name to IP

    -   Architecture (hierarchy) -- doesnt include local

        -   Root -\> TLD -\> authoritative

    -   Problems considered in design of this system -- distributed so no single point of failure, spread traffic, reduce ping

    -   Root DNS servers -- 13 worldwide

    -   TLD servers -- Top level domain DNS (.com, .edu, .org...)

    -   Authoritative DNS servers

    -   Local DNS servers -- part of the ISP aka default name servers caches name/IP pairs up to 2 days

    -   DNS caching -- TLDs always cached, means root DNS servers rarely visited

    -   Nslookup (what it can do, how to use it) -- command line prompt that gives information about local DNS

    -   DNS vulnerabilities -- man-in-middle attacks (intercept requests and give fake responses), DNS Poisoning (sends bad replies to DNS cache)

-   Peer 2 Peer applications

    -   File distribution apps -- bittorrent, Streaming (Kankan), VOIP (skype)

    -   Distributed Hash Tables -- gives a key for a small chunk of data that are combined to make whole files

    -   Peer churn -- peers come and go

-   TCP/UDP Socket programming (understand the order of the steps involved to create a socket connection and send data from one host to another)

    -   UDP

        -   Client and server create socket connection

        -   Client creates and sends datagram via socket

        -   Server reads datagram from socket

        -   Server writes replay and send via socket

        -   Client reads datagram from socket

        -   Client closes socket

    -   TCP adds an initial connection to link the sockets and doesn't need to send IP and socket information with each message

-   **Chapter 3**

-   Logical communication (what does it mean) -- hosts consider themselves physically connected no matter how many routers are inbetween. They assume there will be a path

-   How do the transport and network layers relate to one another?

    -   Transport breaks messages into segments to send, and reassembles to receive

    -   Transport enhances network layer services

-   Transport layer protocols

    -   Multiplexing -- sender hands data from multiple sockets and add a transport header

    -   Demultiplexing -- receiver uses header info to deliver received segment to correct socket

-   Port numbers

-   TCP vs UDP (again!)

-   Port scanning (pg 196)

-   Checksum

-   (We skipped section 3.4)

-   Understand the fields of both UDP and TCP segments

-   Cumulative acks

-   Exponential weighted moving average RTT...why do we use this?

-   TCP Reliable data transfer

    -   Fast retransmit

    -   Selective repeat/go back N

-   Flow control

-   Receive window

-   3 way handshake protocol

    -   SYN and SYNACK segments

-   Closing (FIN and ACK..2 times)

-   SYN Flood Attack

    -   SYN cookies

-   Congestion control

    -   What causes it

    -   How can we control it

-   TCP congestion control

    -   Slow start

    -   Congestion avoidance using additiv increase/multiplicative decrease (diagrams page 276, 277)

-   TCP [[fairness]]

    -   How it is handled

    -   How it can be exploited (parallel connections)
