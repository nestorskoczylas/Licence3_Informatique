import java.net.MulticastSocket;
import java.net.DatagramPacket;
import java.net.InetAddress;
import java.lang.String;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class sendUDP implements Runnable {

    protected BufferedReader in;
    protected MulticastSocket socket;
    protected InetAddress dst;
    protected int port;
    protected String nickname;

    
    public sendUDP(MulticastSocket socket, String nickname) throws Exception {
        this.nickname = nickname;
        this.in = new BufferedReader(new InputStreamReader(System.in));
        this.socket = socket;
        this.port = 7654;
        this.dst = InetAddress.getByName("224.0.0.1");
    }

    public void run() {
        DatagramPacket packet;
        String str = null;
        try {
            while (!(str = this.in.readLine()).equals("quit") && !(str.isEmpty())) {
                    byte[] msg = (this.nickname + " > " + str).getBytes();
                    packet = new DatagramPacket(msg, msg.length, dst, port);
                    socket.send(packet);
            }
            byte[] msg = (this.nickname + " quit the Chat.").getBytes();
            packet = new DatagramPacket(msg, msg.length, dst, port);
            socket.send(packet);
            
        } catch (IOException e) {
            System.out.println("Chat (sendUDP): Problem sending a message");
        }
    }

}