package com.javaposse.html5;

/*
import com.xuggle.mediatool.IMediaReader;
import com.xuggle.mediatool.IMediaWriter;
import com.xuggle.mediatool.MediaToolAdapter;
import com.xuggle.mediatool.ToolFactory;
import com.xuggle.mediatool.event.AudioSamplesEvent;
import com.xuggle.mediatool.event.IAudioSamplesEvent;
import com.xuggle.mediatool.event.IVideoPictureEvent;
import com.xuggle.mediatool.event.VideoPictureEvent;
import com.xuggle.xuggler.*;

import java.awt.*;
import java.awt.image.BufferedImage;
import java.util.concurrent.TimeUnit;

*/

/**
 * This code is ugly.
 */
public class VideoMerger {


    /*

    private BufferedImage screenImage;
    private long screenTimestamp;

    public static void main(String[] args) {

        new VideoMerger().run();

    }

    public void run() {

        final IMediaReader reader = ToolFactory.makeReader("/Users/eirbjo/Downloads/red5-1.0.0/webapps/root/streams/chromakey_video.flv");
        reader.setBufferedImageTypeToGenerate(BufferedImage.TYPE_3BYTE_BGR);

        final IMediaReader screenReader = ToolFactory.makeReader("/Users/eirbjo/Downloads/red5-1.0.0/webapps/root/streams/c4dd8q_screen.flv");
        screenReader.setBufferedImageTypeToGenerate(BufferedImage.TYPE_3BYTE_BGR);

        screenReader.addListener(new MediaToolAdapter() {
            @Override
            public void onVideoPicture(IVideoPictureEvent event) {
                screenImage = event.getImage();
                screenTimestamp = event.getTimeStamp(TimeUnit.MICROSECONDS);
            }
        });

        IMediaWriter writer = ToolFactory.makeWriter("/Users/eirbjo/Downloads/red5-1.0.0/webapps/root/streams/chromakey_video.webm",
                reader);

        final int videoWidth = 320;
        final int videoHeight = 240;
        final int screenWidth = 1200;
        final int screenHeight = 720;

        final int totalWidth = videoWidth + screenWidth;
        final int totalHeight = screenHeight;

        {
            writer.addVideoStream(0, 0, ICodec.ID.CODEC_ID_VP8, totalWidth, totalHeight);
            IStreamCoder coder = writer.getContainer().getStream(0).getStreamCoder();
            coder.setBitRate(10000000);
            coder.setBitRateTolerance(10000000);
            //coder.setProperty("quality", "best");
        }
        {
            writer.addAudioStream(1, 0, ICodec.ID.CODEC_ID_VORBIS, 1, 44100);
            IStreamCoder streamCoder = writer.getContainer().getStream(1).getStreamCoder();
            streamCoder.setSampleFormat(IAudioSamples.Format.FMT_FLT);
        }

        final IVideoPicture out = IVideoPicture.make(
                IPixelFormat.Type.YUV420P,
                totalWidth, totalHeight);

        final BufferedImage image = new BufferedImage(totalWidth, totalHeight, BufferedImage.TYPE_3BYTE_BGR);

        final BufferedImage mask = new BufferedImage(videoWidth, videoHeight, BufferedImage.TYPE_3BYTE_BGR);


        Graphics graphics = image.getGraphics();
        graphics.setColor(Color.WHITE);
        graphics.fillRect(0, 0, totalWidth, totalHeight);
        graphics.dispose();

        MediaToolAdapter merger = new MediaToolAdapter() {


            @Override
            public void onVideoPicture(IVideoPictureEvent event) {

                while(screenTimestamp < event.getTimeStamp(TimeUnit.MICROSECONDS) && screenReader.readPacket() == null) {

                }
                out.setTimeStamp(event.getTimeStamp());

                Graphics2D graphics = (Graphics2D) image.getGraphics();

                graphics.setRenderingHint(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY);

                graphics.drawImage(screenImage, 0, 0, screenWidth, screenHeight, null);
                graphics.drawImage(event.getImage(), totalWidth - videoWidth, totalHeight - videoHeight, null);


                paintChroma(event.getImage(), mask);

                graphics.drawImage(mask, totalWidth - videoWidth, totalHeight - videoHeight * 2, null);

                graphics.dispose();

                VideoPictureEvent vpe = new VideoPictureEvent(
                        event.getSource(), out, image,
                        event.getTimeStamp(), event.getTimeUnit(), event.getStreamIndex());

                super.onVideoPicture(vpe);
            }

            IAudioResampler audioResampler = IAudioResampler.make(1, 1, 44100, 44100, IAudioSamples.Format.FMT_FLT, IAudioSamples.Format.FMT_S16);

            @Override
            public void onAudioSamples(IAudioSamplesEvent event) {
                IAudioSamples out = IAudioSamples.make(event.getAudioSamples().getNumSamples(), 1);
                out.setTimeStamp(event.getTimeStamp());
                audioResampler.resample(out, event.getAudioSamples(), event.getAudioSamples().getNumSamples());
                super.onAudioSamples(new AudioSamplesEvent(event.getSource(), out, event.getStreamIndex()));
                out.delete();
            }
        };
        reader.addListener(merger);

        merger.addListener(writer);

        long l = System.currentTimeMillis();
        while (reader.readPacket() == null) {

        }

        System.out.println("Took: " + (System.currentTimeMillis() - l));

        if (reader.isOpen()) {
            reader.close();
        }
        if (writer.isOpen()) {
            reader.close();
        }
        out.delete();
    }


    private static void paintChroma(BufferedImage image, BufferedImage mask) {

        for (int x = 0; x < image.getWidth(); x++) {
            for (int y = 0; y < image.getHeight(); y++) {
                int rgb = image.getRGB(x, y);
                int r = (rgb >> 16) & 0xff;
                int g = (rgb >> 8) & 0xff;
                int b = rgb & 0xff;

                int rd = Math.abs(90 - r);
                int gd = Math.abs(90 - g);
                int bd = Math.abs(110 - b);

                int diff = (int) Math.sqrt(rd * rd + gd * gd + bd * bd);

                int sensitivity = 70;
                int soften = 40;
                mask.setRGB(x, y, diff > sensitivity ? 0xffffffff : 0x0);
            }
        }
    }
    */

}
