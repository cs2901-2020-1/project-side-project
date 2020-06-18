package services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import config.Constants;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;

@Service
@Transactional
public class StorageService {

    public Path store(MultipartFile file) throws IOException {
        String extension = getExtension(file.getOriginalFilename());
        assert extension.length() > 0;
        /*
        Boolean png = extension.equals("png"),
                jpg = extension.equals("jpg"),
                jpeg = extension.equals("jpeg");

        if (!png && !jpg && !jpeg) {
            return null;
        }*/
        String hashName = getRandomCode(30) + '.' + extension;
        Path filePath = Paths.get(Constants.IMAGE_PATH, hashName);
        Files.write(filePath, file.getBytes());
        return filePath;
    }

    private static String getRandomCode (int length) {
        final String ALPHA_NUMERIC_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder builder = new StringBuilder();
        while (length-- > 0) {
            int character = (int)(Math.random() * ALPHA_NUMERIC_STRING.length());
            builder.append(ALPHA_NUMERIC_STRING.charAt(character));
        }
        return builder.toString();
    }

    private static String getExtension (String fileName) {
        String extension = "";
        int i = fileName.lastIndexOf('.');
        int p = Math.max(fileName.lastIndexOf('/'), fileName.lastIndexOf('\\'));
        if (i > p) {
            extension = fileName.substring(i + 1);
        }
        return extension.toLowerCase();
    }

    public void delete(String path){
        try { 
            Path file_path = Paths.get(Constants.IMAGE_PATH, path);
            Files.deleteIfExists(file_path); 
        } catch(NoSuchFileException e) { 
            System.out.println("No such file/directory exists"); 
        } catch(DirectoryNotEmptyException e) { 
            System.out.println("Directory is not empty."); 
        } catch(IOException e) { 
            System.out.println("Invalid permissions."); 
        }
    }
}