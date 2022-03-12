import java.net.DatagramSocket;
import java.net.DatagramPacket;
import java.lang.String;

public class receiveUDP{

    public static void main(String args[]) throws Exception{
        DatagramSocket socket = new DatagramSocket(Integer.parseInt(args[0]));

        byte[] buff = new byte[512];
        DatagramPacket packet = new DatagramPacket(buff, 512);
        socket.receive(packet);

        System.out.println("Packet's adress : " + packet.getAddress() + "\nPacket's length : " + packet.getLength() + "\nPacket's port : " + packet.getPort());

        byte array[] = packet.getData();
        String str = new String(array);
        System.out.println("Message received > " + str);

        socket.close();

    }
}