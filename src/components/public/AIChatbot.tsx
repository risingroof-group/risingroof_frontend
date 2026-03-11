'use client';

import * as React from 'react';

interface Message {
  role: 'user' | 'bot';
  text: string;
  time: string;
}

const QUICK_REPLIES = [
  'Best areas under ₹1Cr',
  'NRI investment guide',
  'Calculate my EMI',
  'Properties in Gachibowli',
  'Book a consultation',
];

function getBotResponse(message: string): string {
  const msg = message.toLowerCase();

  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey') || msg.includes('namaste')) {
    return "Hello! 👋 Welcome to RisingRoof. I'm your AI property assistant. I can help you find properties, answer questions about Hyderabad localities, calculate EMIs, and much more. How can I assist you today?";
  }
  if (msg.includes('emi') || msg.includes('loan') || msg.includes('finance') || msg.includes('calculate')) {
    return "💰 For a ₹60L home loan at 8.5% over 20 years, your EMI ≈ ₹52,000/month.\n\nKey rules:\n• EMI should not exceed 40% of take-home pay\n• Down payment is usually 20% of property value\n• Extra costs: Stamp duty 4% + Registration 0.5%\n\nShare your budget and I'll calculate for you!";
  }
  if (msg.includes('gachibowli') || msg.includes('hitec') || msg.includes('financial district')) {
    return "🖥️ Gachibowli & HITEC City — IT Corridor West\n\n• Avg Price: ₹7,500–₹12,000/sqft\n• Rental Yield: 3.5–4.5%\n• Best for: IT professionals, NRIs\n• Near: TCS, Infosys, Microsoft, Google\n• Metro connectivity available\n\nWant to connect with an advisor?";
  }
  if (msg.includes('kondapur') || msg.includes('narsingi')) {
    return "🌿 Kondapur & Narsingi — Premium Residential\n\n• Avg Price: ₹6,000–₹9,500/sqft\n• Rental Yield: 3.0–4.0%\n• Best for: Families, IT Buyers\n• Excellent schools, hospitals & malls nearby\n\nWant to schedule a site visit?";
  }
  if (msg.includes('nri') || msg.includes('dubai') || msg.includes('usa') || msg.includes('uk') || msg.includes('abroad') || msg.includes('foreign')) {
    return "🌍 NRI Investment Services\n\nWe have a dedicated NRI Desk!\n✅ Live video property walkthroughs\n✅ FEMA & RBI compliance support\n✅ NRI home loans (SBI, HDFC, ICICI)\n✅ Power of Attorney support\n✅ Rental management post-purchase\n✅ Available on WhatsApp & Zoom\n\nCall: +91 84593 21228";
  }
  if (msg.includes('budget') || msg.includes('under') || msg.includes('affordable') || msg.includes('cheap') || msg.includes('1 cr') || msg.includes('1cr') || msg.includes('1 crore')) {
    return "💡 Best Areas by Budget in Hyderabad:\n\n• Under ₹50L → Shadnagar, Maheshwaram\n• ₹50L–₹1Cr → Kompally, Uppal, LB Nagar\n• ₹1Cr–₹2Cr → Kondapur, Gachibowli\n• ₹2Cr+ → Banjara Hills, Jubilee Hills\n\nWhich budget works for you?";
  }
  if (msg.includes('invest') || msg.includes('roi') || msg.includes('return') || msg.includes('yield') || msg.includes('appreciation')) {
    return "📈 Top Investment Zones in Hyderabad 2025:\n\n🔥 Tellapur — 20–25% appreciation p.a.\n🔥 Financial District — 18–22% p.a.\n🔥 Kompally — 12–18% p.a., affordable\n🔥 Shadnagar — 15–22% p.a. (pre-RRR)\n\nHyderabad saw 64% appreciation since 2019 — highest in India!";
  }
  if (msg.includes('rera') || msg.includes('legal') || msg.includes('verify') || msg.includes('safe')) {
    return "✅ RERA Verification Guide:\n\n1. Visit rera.telangana.gov.in\n2. Check builder registration number\n3. Verify project RERA ID\n4. Check approved floor plan\n5. Look for pending litigations\n\nAt RisingRoof, every listing is 100% RERA-verified with free legal opinion!";
  }
  if (msg.includes('consult') || msg.includes('appointment') || msg.includes('meet') || msg.includes('book') || msg.includes('call')) {
    return "📞 Book Your Free Consultation!\n\n📱 Call/WhatsApp: +91 84593 21228\n📧 hellorisingroof@gmail.com\n🏢 Gachibowli, Hyderabad\n⏰ Mon–Sat: 9am – 7pm IST\n\nScroll to the Contact section and fill the form — we respond within 2 hours!";
  }
  if (msg.includes('kompally') || msg.includes('north') || msg.includes('shamirpet')) {
    return "🚀 Kompally & North Hyderabad — High Growth\n\n• Avg Price: ₹3,500–₹5,500/sqft\n• Appreciation: 12–18% p.a.\n• Best for: Budget buyers, Investors\n• ORR & upcoming metro access\n\nBest entry point before prices rise!";
  }
  if (msg.includes('bhk') || msg.includes('flat') || msg.includes('apartment') || msg.includes('villa')) {
    return "🏠 Property Types Available:\n\n• 1 BHK — ₹25L–₹55L (Kompally, Uppal)\n• 2 BHK — ₹50L–₹1.2Cr (Kondapur)\n• 3 BHK — ₹85L–₹2.5Cr (HITEC City)\n• Villas — ₹1.5Cr–₹8Cr (Banjara Hills)\n• Plots — ₹15L–₹2Cr (Shadnagar)\n\nWhat type are you looking for?";
  }
  if (msg.includes('stamp') || msg.includes('registration') || msg.includes('duty') || msg.includes('charges')) {
    return "📋 Registration Charges in Hyderabad:\n\n• Stamp Duty: 4%\n• Registration Fee: 0.5%\n• Transfer Duty: 1.5%\n• Total: ~6% of property value\n\nFor a ₹80L property → budget ₹4.8L for registration.\n\nTip: Ready-to-move = no GST (under-construction = 5% GST)";
  }
  if (msg.includes('thank') || msg.includes('thanks') || msg.includes('bye') || msg.includes('okay') || msg.includes('ok')) {
    return "You're welcome! 😊 Always here if you have more questions. We offer free consultations with no obligations.\n\nCall anytime: +91 84593 21228\n\nGood luck finding your dream home! 🏡";
  }
  if (msg.includes('builder') || msg.includes('developer') || msg.includes('prestige') || msg.includes('godrej')) {
    return "🏗️ Our Trusted Builder Partners:\n\n• Prestige Group\n• Godrej Properties\n• Brigade Group\n• Aparna Constructions\n• Ramky Estates\n• My Home Group\n• Aliens Space Station\n• NCC Urban & more\n\nAll RERA-approved and quality-verified!";
  }
  return "Thanks for your message! 🏡 I'm your RisingRoof AI assistant for Hyderabad real estate.\n\nI can help with:\n• Property search by locality & budget\n• NRI investment guidance\n• EMI & stamp duty calculations\n• RERA verification advice\n• Booking free consultations\n\nWhat's your budget and preferred locality?";
}

export default function AIChatbot() {
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([
    {
      role: 'bot',
      text: "Hello! 👋 I'm Aria, your RisingRoof AI Property Assistant.\n\nI can help you:\n• Find properties in Hyderabad\n• Answer NRI investment queries\n• Calculate EMIs & registration costs\n• Book free consultations\n\nHow can I help you today?",
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    }
  ]);
  const [input, setInput] = React.useState('');
  const [typing, setTyping] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, typing, open]);

  function sendMessage(text?: string) {
    const msgText = (text || input).trim();
    if (!msgText) return;
    const now = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { role: 'user', text: msgText, time: now }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      const response = getBotResponse(msgText);
      setTyping(false);
      setMessages(prev => [...prev, {
        role: 'bot',
        text: response,
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      }]);
    }, 900 + Math.random() * 500);
  }

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  // render \n as <br/> and **bold**
  function renderText(text: string) {
    const lines = text.split('\n');
    return lines.map((line, i) => {
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <React.Fragment key={i}>
          {parts.map((part, j) =>
            part.startsWith('**') && part.endsWith('**')
              ? <strong key={j}>{part.slice(2, -2)}</strong>
              : part
          )}
          {i < lines.length - 1 && <br />}
        </React.Fragment>
      );
    });
  }

  return (
    <>
      {/* ── AI Chat Toggle Button ── bottom-right */}
      <button
        id="rr-ai-toggle"
        onClick={() => { setOpen(o => !o); setTimeout(() => inputRef.current?.focus(), 300); }}
        title="Chat with Aria — RisingRoof AI"
        style={{
          position: 'fixed',
          bottom: '28px',
          right: '28px',
          zIndex: 10000,
          width: '58px',
          height: '58px',
          background: 'linear-gradient(135deg, #3B1F5E, #7C3AED)',
          borderRadius: '50%',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 24px rgba(59,31,94,0.55)',
          transition: 'transform 0.25s, box-shadow 0.25s',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.12)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" opacity="0.9"/>
            <circle cx="9" cy="10" r="1" fill="#C59DD9"/>
            <circle cx="12" cy="10" r="1" fill="#C59DD9"/>
            <circle cx="15" cy="10" r="1" fill="#C59DD9"/>
          </svg>
        )}
        <span style={{
          position: 'absolute', top: '-3px', right: '-3px',
          background: '#C59DD9', color: '#3B1F5E',
          fontSize: '8px', fontWeight: 800,
          padding: '2px 5px', borderRadius: '8px',
          border: '2px solid white', letterSpacing: '0.5px',
          lineHeight: 1.2,
        }}>AI</span>
      </button>

      {/* ── Chat Window ── */}
      {open && (
        <div
          style={{
            position: 'fixed',
            bottom: '100px',
            right: '20px',
            zIndex: 10000,
            width: '360px',
            maxWidth: 'calc(100vw - 32px)',
            maxHeight: 'min(560px, calc(100vh - 130px))',
            background: '#ffffff',
            borderRadius: '18px',
            boxShadow: '0 8px 48px rgba(59,31,94,0.28)',
            display: 'flex',
            flexDirection: 'column',
            fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
            overflow: 'hidden',
            animation: 'rrChatIn 0.28s cubic-bezier(0.34,1.56,0.64,1)',
          }}
        >
          <style>{`
            @keyframes rrChatIn {
              from { opacity: 0; transform: translateY(16px) scale(0.96); }
              to   { opacity: 1; transform: translateY(0)   scale(1);    }
            }
            @keyframes rrDot {
              0%,80%,100% { transform: scale(0.6); opacity: 0.4; }
              40%          { transform: scale(1);   opacity: 1;   }
            }
            #rr-chat-msgs::-webkit-scrollbar { width: 4px; }
            #rr-chat-msgs::-webkit-scrollbar-thumb { background: #DDD0EC; border-radius: 4px; }
          `}</style>

          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #3B1F5E 0%, #5A2D82 100%)',
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '11px',
            flexShrink: 0,
          }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%',
              background: 'rgba(197,157,217,0.22)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '20px', flexShrink: 0,
            }}>🤖</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '14px', lineHeight: 1.3 }}>Aria — RisingRoof AI</div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '5px', marginTop: '2px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', display: 'inline-block', flexShrink: 0 }} />
                Online · Hyderabad Property Expert
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: 'rgba(255,255,255,0.12)', border: 'none', color: '#fff',
                borderRadius: '50%', width: '28px', height: '28px',
                cursor: 'pointer', fontSize: '14px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}
            >✕</button>
          </div>

          {/* Messages */}
          <div
            id="rr-chat-msgs"
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '14px 12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                  gap: '7px',
                  alignItems: 'flex-end',
                }}
              >
                {msg.role === 'bot' && (
                  <div style={{
                    width: '26px', height: '26px', borderRadius: '50%',
                    background: '#3B1F5E', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    fontSize: '13px', flexShrink: 0,
                  }}>🤖</div>
                )}
                <div style={{
                  maxWidth: '78%',
                  background: msg.role === 'user'
                    ? 'linear-gradient(135deg, #3B1F5E, #5A2D82)'
                    : '#F2EAF7',
                  color: msg.role === 'user' ? '#fff' : '#1f1f2e',
                  padding: '9px 12px',
                  borderRadius: msg.role === 'user'
                    ? '14px 14px 3px 14px'
                    : '14px 14px 14px 3px',
                  fontSize: '13px',
                  lineHeight: 1.65,
                  wordBreak: 'break-word',
                }}>
                  <div>{renderText(msg.text)}</div>
                  <div style={{
                    fontSize: '10px',
                    color: msg.role === 'user' ? 'rgba(255,255,255,0.55)' : '#9CA3AF',
                    marginTop: '4px',
                    textAlign: 'right',
                  }}>{msg.time}</div>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div style={{ display: 'flex', gap: '7px', alignItems: 'flex-end' }}>
                <div style={{
                  width: '26px', height: '26px', borderRadius: '50%',
                  background: '#3B1F5E', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', fontSize: '13px',
                }}>🤖</div>
                <div style={{
                  background: '#F2EAF7', padding: '10px 14px',
                  borderRadius: '14px 14px 14px 3px',
                  display: 'flex', gap: '4px', alignItems: 'center',
                }}>
                  {[0, 1, 2].map(k => (
                    <span key={k} style={{
                      width: '6px', height: '6px', borderRadius: '50%',
                      background: '#C59DD9', display: 'inline-block',
                      animation: `rrDot 1.3s ease-in-out ${k * 0.18}s infinite`,
                    }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <div style={{
            padding: '7px 12px 5px',
            borderTop: '1px solid #EDE5F8',
            display: 'flex',
            gap: '5px',
            flexWrap: 'wrap',
            flexShrink: 0,
          }}>
            {QUICK_REPLIES.map(q => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                style={{
                  background: 'rgba(59,31,94,0.06)',
                  border: '1px solid rgba(59,31,94,0.16)',
                  borderRadius: '20px',
                  padding: '3px 10px',
                  fontSize: '11px',
                  color: '#3B1F5E',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.18s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#3B1F5E';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(59,31,94,0.06)';
                  e.currentTarget.style.color = '#3B1F5E';
                }}
              >{q}</button>
            ))}
          </div>

          {/* Input */}
          <div style={{
            padding: '10px 12px',
            borderTop: '1px solid #EDE5F8',
            display: 'flex',
            gap: '8px',
            alignItems: 'flex-end',
            flexShrink: 0,
          }}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask about properties, localities, EMI..."
              rows={1}
              style={{
                flex: 1,
                border: '1.5px solid #DDD0EC',
                borderRadius: '10px',
                padding: '8px 12px',
                fontSize: '13px',
                resize: 'none',
                fontFamily: 'inherit',
                outline: 'none',
                background: '#FAFAFA',
                color: '#1f1f2e',
                lineHeight: 1.45,
                maxHeight: '80px',
                overflowY: 'auto',
              }}
              onFocus={e => (e.currentTarget.style.borderColor = '#5A2D82')}
              onBlur={e => (e.currentTarget.style.borderColor = '#DDD0EC')}
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim()}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: input.trim() ? 'linear-gradient(135deg, #3B1F5E, #5A2D82)' : '#E5E7EB',
                border: 'none',
                cursor: input.trim() ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'background 0.2s',
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
                  stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Footer */}
          <div style={{
            textAlign: 'center',
            padding: '5px 0 7px',
            fontSize: '10px',
            color: '#C4B5D8',
            borderTop: '1px solid #EDE5F8',
            background: '#FAFAFA',
            flexShrink: 0,
          }}>
            Powered by RisingRoof AI · Hyderabad Real Estate
          </div>
        </div>
      )}
    </>
  );
}
