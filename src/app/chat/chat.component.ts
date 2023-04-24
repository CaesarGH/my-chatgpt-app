import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


let API_URL = "https://api.openai.com/v1/chat/completions"
let API_KEY = "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"

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  chatHistory: Chat[] = [];
  userInput: string = '';
  headerss: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${API_KEY}`
  });

  constructor(private http: HttpClient) { }

  sendMessage() {
    if (this.userInput.trim() != "") {
      // 添加用户输入到聊天历史记录中
    const userChat: Chat = { role: 'user', content: this.userInput };
    this.chatHistory.push(userChat);

    // 发送 HTTP 请求到 OpenAI API
    const body = {
      model: 'gpt-3.5-turbo',
      messages: this.chatHistory
    };
    this.http.post(`${API_URL}`, body, {headers : this.headerss}).subscribe((response: any) => {
      const botResponse = response.choices[0].message.content;
      // 添加机器人响应到聊天历史记录中
      const botChat: Chat = { role: 'assistant', content: botResponse };
      this.chatHistory.push(botChat);
      // 重置用户输入
      this.userInput = '';
    });
  }
    }
    
}

export interface Chat {
  role: string,
  content: string
}