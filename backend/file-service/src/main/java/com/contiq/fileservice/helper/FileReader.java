package com.contiq.fileservice.helper;

import java.io.IOException;

public interface FileReader {

    /**
     *  Method to read and parse the content of the file
     * @param bytes
     * @return String
     * @throws IOException
     */
    String parsePdfContent(byte[] bytes) throws IOException;

}
