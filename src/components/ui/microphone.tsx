import React, { useRef, useState } from 'react';

function Microphone() {  

  const [recordedUrl, setRecordedUrl] = useState('');
  const mediaStream = useRef(null);
  const mediaRecorder = useRef(null);
  const chunks = useRef([]);
  const [shouldRecord, setShouldRecord] = useState(false);
  
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(
        { audio: true }
      );
      mediaStream.current = stream;
      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.current.push(e.data);
        }
      };
      mediaRecorder.current.onstop = () => {
        const recordedBlob = new Blob(
          chunks.current, { type: 'audio/webm' }
        );
        const url = URL.createObjectURL(recordedBlob);
        setRecordedUrl(url);
        chunks.current = [];
      };
      mediaRecorder.current.start();
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
      mediaRecorder.current.stop();
    }
    if (mediaStream.current) {
      mediaStream.current.getTracks().forEach((track) => {
        track.stop();
      });
    }
  };

  const toggleRecording = async () => {
    setShouldRecord(!shouldRecord);
    if (shouldRecord) {      
      startRecording();
    } else {      
      stopRecording();
    }    
  }

  return (
    <div>
      <table>
        <tr>
          <td>
          <svg width="75" height="100" onClick={toggleRecording} xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="20" stroke="black" stroke-width="2" fill="red" />
            <circle cx="50" cy="50" r="10" stroke="white" stroke-width="8" fill="red" />
          </svg>
          </td>
          <td>
            <audio controls src={recordedUrl} style={{ width: '200px' }} />              
          </td>
        </tr>
      </table>            
    </div>
  );
}

export { Microphone};
