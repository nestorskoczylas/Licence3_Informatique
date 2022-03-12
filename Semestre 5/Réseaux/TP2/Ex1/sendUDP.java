import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.DatagramPacket;
import java.lang.String;

public class sendUDP{

    public static void main(String args[]) throws Exception{
    	DatagramSocket socket;
    	DatagramPacket packet;
    	
    	InetAddress adress = InetAddress.getByName(args[0]);
    	int port = Integer.parseInt(args[1]);
    	byte array[] = args[2].getBytes();
    	
    	packet = new DatagramPacket(array, array.length, adress, port);
    	socket = new DatagramSocket();
    	
        socket.send(packet);
        
        socket.close();

    }
}