<!--*** ==================================================  Internet Protocols   ============================================================== ***-->



/// Internet Protocols
1. What is TCP Protocol and Why It Is Widely Used
TCP (Transmission Control Protocol) is one of the core
communication standards of the internet.
Web browsing, sending emails, downloading files (FTP).
 Example Use Cases:
It ensures reliable, ordered, and error-checked delivery of data.

Large data is broken into smaller packets, and TCP makes sure they are
reassembled in the correct order at the destination.

If any packet is lost or corrupted, TCP automatically resends it.

This is why TCP is known for accuracy, reliability, and proper
sequencing.
Internet Protocols
2. How Connection is Established Using TCP

 (3-Way Handshake)
Before sending data, TCP ensures that both client and server are
ready by performing a 3-way handshake:
 After these 3 steps, the connection is established. 
 This ensures synchronization and reliability between client and server.

 /// Internet Protocols
 3. What is UDP and Why It Is Used for Fast

 Communication
UDP (User Datagram Protocol) is another major protocol, but unlike
TCP, it focuses on speed over reliability.
Video streaming, online gaming, voice and video calls — where speed
matters more than 100% accuracy.
 Example Use Cases:
4. How UDP Works
It sends packets directly without checking if they are received.

There is no error correction and no sequencing.

Packets may get lost or arrive in the wrong order, but communication
remains very fast.
UDP skips connection setup and directly sends packets:
No handshake is required.

Client → directly sends packets → Server.

Some packets may be lost, but because of its low latency, it s ideal for
real-time communication.

/// Internet Protocols
5. Difference Between TCP and UDP
Feature
Connection
Reliability
Speed
Use Cases
Packet Order
Connection-oriented (3-way handshake)
Reliable (error checking, retransmission)
Slower (due to checks & confirmations)
Web browsing, file transfer, email
Maintains correct packet order Packets may arrive out of order
Connectionless (no handshake)
Unreliable (no guarantee of delivery)
Faster (no checks, direct send)
Gaming, video streaming, voice calls
TCP

(Transmission Control Protocol)
UDP

 (User Datagram Protocol)
