import java.net.MulticastSocket;
import java.net.DatagramPacket;
import java.net.InetAddress;
import java.lang.String;
import java.lang.Runnable;
import java.io.IOException;

public class receiveUDP implements Runnable {

    protected MulticastSocket socket;
    protected int port;
    protected InetAddress dst;

    public receiveUDP(MulticastSocket socket) throws Exception {
        this.port = 7654;
        this.dst = InetAddress.getByName("224.0.0.1");
        this.socket = socket;
    }

    public void run() {
        DatagramPacket packet;
        byte[] msg;
        String str;
        while (!this.socket.isClosed()) {
            packet = new DatagramPacket(new byte[512], 512);

            try {
                this.socket.receive(packet);
                msg = packet.getData();
                str = new String(msg);
                System.out.println(str);
                System.out.print("> ");
                
            } catch (IOException e) {
                if (!this.socket.isClosed()) {
                    System.out.println("Chat (receiveUDP): Problem receiving a message");
                }
            }
        }
    }

}