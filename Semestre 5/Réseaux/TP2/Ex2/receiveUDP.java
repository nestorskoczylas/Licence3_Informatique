import java.net.MulticastSocket;
import java.net.NetworkInterface;
import java.net.DatagramPacket;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.lang.String;

public class receiveUDP {

    public static void main (String[] args) throws Exception {
	MulticastSocket socket = new MulticastSocket(7654);

	byte[] buff = new byte[512];
    DatagramPacket packet = new DatagramPacket(buff, 512);
	String str;

	InetAddress mcastaddr = InetAddress.getByName("224.0.0.1");

	socket.joinGroup(mcastaddr);
	socket.receive(packet);

	System.out.println("Packet's adress : " + packet.getAddress() + "\nPacket's length : " + packet.getLength() + "\nPacket's port : " + packet.getPort());

	byte array[] = packet.getData();
	str = new String(array);
	System.out.println("Message received > " + str);

	socket.close();

    }
}
