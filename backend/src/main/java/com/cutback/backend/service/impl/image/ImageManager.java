package com.cutback.backend.service.impl.image;

import com.cutback.backend.dto.error.ErrorCode;
import com.cutback.backend.exception.CutbackException;
import com.cutback.backend.model.image.Image;
import com.cutback.backend.model.image.ImageExtension;
import com.cutback.backend.model.image.Size;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import javax.imageio.stream.ImageInputStream;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
import java.nio.file.Files;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class ImageManager {

    private final ImageService imageService;

    public Image save(MultipartFile imageFile) {
        String extensionValue = getExtension(imageFile.getOriginalFilename())
                .orElseThrow(() -> new CutbackException("Invalid file", ErrorCode.BAD_REQUEST));

        ImageExtension extension = ImageExtension.findByValue(extensionValue)
                .orElseThrow(() -> new CutbackException("Invalid file", ErrorCode.BAD_REQUEST));

        Image image = new Image();
        image.setExtension(extension);
        image = imageService.insert(image);

        try {
            File original = save(imageFile, image);
            save(original, image, Size.SMALL);
            save(original, image, Size.MEDIUM);
            save(original, image, Size.LARGE);

            return image;
        } catch (Exception e) {
            imageService.delete(image);
            throw new CutbackException(
                    String.format("An error occured trying to save the image, cause = [%s]",
                            e.getMessage()),
                    ErrorCode.INTERNAL_ERROR
            );
        }
    }

    public byte[] get(Image image, Size size) {
        File file = new File(getPath(size), getFilename(image));
        try(InputStream inputStream = new FileInputStream(file)) {
            return inputStream.readAllBytes();
        } catch (IOException e) {
            throw new CutbackException("Could not find/read file from local storage", ErrorCode.INTERNAL_ERROR);
        }
    }

    private File save(MultipartFile imageFile, Image image) throws IOException {
        File file = new File(getPath(Size.ORIGINAL), getFilename(image));
        try(FileOutputStream outputStream = new FileOutputStream(file)) {
            outputStream.write(imageFile.getBytes());
        }

        return file;
    }

    private void save(File source, Image image, Size size) throws IOException {
        File file = new File(getPath(size), getFilename(image));
        if (!source.exists()) {
            throw new RuntimeException("Original file does not exist");
        }
        try (FileOutputStream outputStream = new FileOutputStream(file)) {
            outputStream.write(resizeImage(source, image.getExtension(), size));
        }
    }

    private byte[] resizeImage(File imageFile, ImageExtension extension, Size size) throws IOException {
        if (size == null) {
            throw new RuntimeException("Size is null");
        }

        if (Size.LARGE == size) {
            return resizeImage(imageFile, extension, 1920);
        } else if (Size.MEDIUM == size) {
            return resizeImage(imageFile, extension, 1280);
        }

        return resizeImage(imageFile, extension, 300);
    }

    private byte[] resizeImage(File imageFile, ImageExtension extension, int width) throws IOException {
        if (width < 300) {
            throw new RuntimeException("Min width is 300px");
        }
        BufferedImage inputImage = ImageIO.read(imageFile);
        System.out.println(inputImage);
        int originalWidth = inputImage.getWidth();
        int originalHeight = inputImage.getHeight();
        int height = (width * originalHeight) / originalWidth;

        BufferedImage outputImage = new BufferedImage(width, height, inputImage.getType());
        Graphics2D g2d = outputImage.createGraphics();
        g2d.drawImage(inputImage, 0, 0, width, height, null);
        g2d.dispose();

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(outputImage, extension.getValue(), baos);
        return baos.toByteArray();
    }

    private String getFilename(Image image) {
        return image.getUuid() + "." + image.getExtension().getValue();
    }

    private String getPath(Size size) {
        String PATH = "images";
        return PATH + "/" + size.getValue();
    }

    private Optional<String> getExtension(String filename) {
        return Optional.ofNullable(filename)
                .filter(f -> f.contains("."))
                .map(f -> f.substring(filename.lastIndexOf(".") + 1));
    }
}
