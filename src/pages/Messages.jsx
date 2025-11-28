import React, { useState, useEffect, useRef } from 'react';
import TopNavBar from '../components/TopNavBar';
import '../styles/Messages.css';
import { loadChatHistory, saveChatHistory } from '../data/mockData';

// Mock data for conversation list (using mockRoommates for dynamic names/avatars)
const mockConversations = [
    { id: 1, name: 'Sarah', lastMessage: 'Great, I can move in next month.', time: '10:30 AM', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAOAIpuqxMwl8_u2cJCCaTYyJCVD-kGPeePiakzgLGk3SJrCy8dDY8DUIKl4PJuHMr8tadsCZAPT0oKPnv_4_efCpbUn5-bcD4ike3qNGzJmiqQZKqYmsOGB1d_74-ZrFlz2zpf-16RyPrQ6hryWF8nKy9DlHzwI9tyysNAKCqkLHnQ5-3kkd6owFR72xSK7QeP8qyBHMdw8EJeeEmTBpyMAGufW6auhnrdqPa1zGMLbym-jYWWs7rzB0xyW4XAU_lFQfs6zgkSkYa', unread: 0 },
    { id: 2, name: 'Mark', lastMessage: 'What about utility split?', time: 'Yesterday', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuiXlZVGCRSLF-jZF_RhjA6FH9jnWjMXzulywpUMjBvA5miDcm-iBZVxGzebdvgR2VQMuiEfmR_sB8pCRXaJDwc0866txchUX-MxdfgTGICLwCQakGjyNF7wdd7dJRHv1ud4VKCmlqBFPRkxEydykeaLcCFckLBlRzDhTRvUzA5HgIBxZNSZ9SD00K5XfljD6cuOn_w77dIrwluaSFY7I49UHf9QwOkvJ1Xfh3OdSG8I5AvpvWcDAuUnwjFx1ESW6tb9fsDNPsHknM', unread: 0 },
    { id: 3, name: 'Emily', lastMessage: 'Are pets allowed in the building?', time: '3 days ago', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAI2Y4f6O5jMWwIGu0WoOaGQcbuBOB1OxjpZk1rbkYZptruHRrpGI5FHMqt7mndDI_J73JiIg9b4fD0ChGdQ6XBjoLIHPtZFgywORqiFkGJkRBYo-xOhv_9HoGjlom8IgEcaI1jvi3Hk8ftQ4Qkg4xpAI5lDNiZapT_u_lCyIf_1cG1sQfsNmJZd0Wx_bevOB3FiEyEXfhIwuj2oyhG-MJ8vKjRGH3gJ6CU3l0YIcP6fDZr_UF0eMJcJ0_SYyktZ0GJDZkrnaSfjQqo', unread: 0 },
    { id: 4, name: 'Landlord Dave', lastMessage: 'Okay, I\'ll check the profile.', time: '1 week ago', avatarUrl: 'https://placehold.co/100x100?text=LD', unread: 0 },
];

const Messages = () => {
    // State for all message history, initialized from localStorage
    const [chatHistory, setChatHistory] = useState(loadChatHistory);
    // State to manage the active chat 
    const [activeChatId, setActiveChatId] = useState(mockConversations[0].id);
    const [messageInput, setMessageInput] = useState('');
    
    const activeChat = mockConversations.find(c => c.id === activeChatId);
    const currentMessages = chatHistory[activeChatId] || [];
    
    // Ref for auto-scrolling
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Auto-scroll whenever messages change
    useEffect(scrollToBottom, [currentMessages]);


    const handleSendMessage = (e) => {
        e.preventDefault();
        const text = messageInput.trim();
        if (text === '') return;

        const newMessage = {
            id: currentMessages.length + 1,
            text: text,
            sender: 'self',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        
        // 1. Update state locally
        const newHistory = {
            ...chatHistory,
            [activeChatId]: [...currentMessages, newMessage],
        };
        
        setChatHistory(newHistory);
        setMessageInput('');

        // 2. Persist to localStorage
        saveChatHistory(newHistory);
        
        // SIMULATION: Add an automated response from the "other" user
        setTimeout(() => {
            const botResponse = {
                id: currentMessages.length + 2,
                text: `(Auto-reply from ${activeChat.name}): Thanks for the message! I'm interested.`,
                sender: 'other',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            
            const updatedHistoryWithBot = {
                ...newHistory,
                [activeChatId]: [...newHistory[activeChatId], botResponse],
            };

            setChatHistory(updatedHistoryWithBot);
            saveChatHistory(updatedHistoryWithBot);
        }, 1000); 
    };

    const ChatBubble = ({ text, sender, time }) => (
        <div className={`chat-bubble-container ${sender === 'self' ? 'self-message' : 'other-message'}`}>
            <div className="chat-bubble">
                <p className="chat-text">{text}</p>
                <span className="chat-time">{time}</span>
            </div>
        </div>
    );

    const ConversationItem = ({ conversation, isActive }) => (
        <div 
            className={`conversation-item ${isActive ? 'active' : ''}`}
            onClick={() => setActiveChatId(conversation.id)} // Dynamic click handler
        >
            <div className="conv-avatar" style={{ backgroundImage: `url(${conversation.avatarUrl})` }}></div>
            <div className="conv-details">
                <p className="conv-name">{conversation.name}</p>
                <p className="conv-last-message">{conversation.lastMessage}</p>
            </div>
            <div className="conv-status">
                <span className="conv-time">{conversation.time}</span>
                {conversation.unread > 0 && <span className="conv-unread-count">{conversation.unread}</span>}
            </div>
        </div>
    );

    return (
        <div className="messages-wrapper">
            <TopNavBar activeLink="Messages" />
            <main className="messages-main-content">
                <h1 className="messages-page-title">Messages</h1>
                
                <div className="messages-chat-grid">
                    {/* Left Column: Conversation List */}
                    <aside className="conversations-sidebar">
                        {mockConversations.map(conv => (
                            <ConversationItem 
                                key={conv.id}
                                conversation={conv}
                                isActive={activeChatId === conv.id}
                            />
                        ))}
                    </aside>

                    {/* Right Column: Active Chat Window */}
                    <section className="active-chat-window">
                        {activeChat ? (
                            <>
                                <header className="chat-header">
                                    <div className="chat-header-info">
                                        <div className="chat-header-avatar" style={{ backgroundImage: `url(${activeChat.avatarUrl})` }}></div>
                                        <p className="chat-header-name">{activeChat.name}</p>
                                    </div>
                                    <button className="chat-profile-btn">View Profile</button>
                                </header>
                                <div className="chat-body">
                                    {currentMessages.map((msg, index) => (
                                        <ChatBubble key={msg.id + '-' + index} {...msg} />
                                    ))}
                                    <div ref={messagesEndRef} /> {/* Scroll target */}
                                </div>
                                <footer className="chat-footer">
                                    <form onSubmit={handleSendMessage} className="message-form">
                                        <input
                                            type="text"
                                            value={messageInput}
                                            onChange={(e) => setMessageInput(e.target.value)}
                                            placeholder="Type a message..."
                                            className="message-input"
                                        />
                                        <button type="submit" className="send-btn" disabled={!messageInput.trim()}>
                                            <span className="material-symbols-outlined">send</span>
                                        </button>
                                    </form>
                                </footer>
                            </>
                        ) : (
                            <div className="no-chat-selected">Select a conversation to start chatting.</div>
                        )}
                    </section>
                </div>
            </main>
        </div>
    );
};

export default Messages;