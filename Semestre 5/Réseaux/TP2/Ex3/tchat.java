import java.net.MulticastSocket;
import java.net.DatagramPacket;
import java.net.NetworkInterface;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.lang.String;


public class tchat {

    protected MulticastSocket socket;
    protected String nickname;

    public tchat(String nickname) throws Exception {
        this.nickname = nickname;

        int port = 7654;
        InetAddress mcastaddr = InetAddress.getByName("224.0.0.1");
        
        socket = new MulticastSocket(port);
        socket.joinGroup(mcastaddr);
    }

    public void run() throws Exception {
        receiveUDP receive = new receiveUDP(this.socket);
        sendUDP send = new sendUDP(this.socket, this.nickname);
        Thread trReceive = new Thread(receive);
        Thread trSend = new Thread(send);

        trReceive.start();
        trSend.start();
        trSend.join();

        this.socket.close();
    }

    public static void main(String[] args) throws Exception {
        String nickname;

        if (args.length >= 1 && !args[0].equals("")){
            nickname = args[0];
            System.out.println("Welcome " + nickname + " :)");
            System.out.print("> ");
        }
        else {
            nickname = "Patrick";
            System.out.println("Welcome " + nickname +" :)");
            System.out.print("> ");
        }
        tchat t = new tchat(nickname);
        t.run();
    }

}