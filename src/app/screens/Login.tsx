import logo from "figma:asset/75f4a380686ced8781dad611a9814fa31c254317.png";
import vtsLogo from "figma:asset/91c3dd93a2106205496ec9f6c5247d263cb80c55.png";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

export function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState<"employee" | "admin">("employee");
  const [phone, setPhone] = useState("");
  const [smsCode, setSmsCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    setCodeSent(true);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/employee/home");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: "#f5f5f5" }}>
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-4">
            <img src={logo} alt="Work Helper" className="w-48 h-auto" />
          </div>
          <p className="text-gray-600">Платформа обучения сотрудников</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <form onSubmit={codeSent ? handleLogin : handleSendCode} className="space-y-6">
            {/* Role Selector */}
            <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
              <button
                type="button"
                onClick={() => setRole("employee")}
                className={`flex-1 py-2 px-4 rounded-md transition-all ${
                  role === "employee"
                    ? "bg-white shadow-sm"
                    : "text-gray-600"
                }`}
                style={role === "employee" ? { color: "#1A2B4A" } : {}}
              >
                Сотрудник
              </button>
              <button
                type="button"
                onClick={() => setRole("admin")}
                className={`flex-1 py-2 px-4 rounded-md transition-all ${
                  role === "admin"
                    ? "bg-white shadow-sm"
                    : "text-gray-600"
                }`}
                style={role === "admin" ? { color: "#1A2B4A" } : {}}
              >
                Администратор
              </button>
            </div>

            {/* Phone Input */}
            <div className="space-y-2">
              <Label htmlFor="phone">Номер телефона</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+7 (___) ___-__-__"
                className="h-12 text-base"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={codeSent}
              />
            </div>

            {/* SMS Code Input (shown after code is sent) */}
            {codeSent && (
              <div className="space-y-2">
                <Label htmlFor="smsCode">SMS код</Label>
                <Input
                  id="smsCode"
                  type="text"
                  placeholder="Введите код из SMS"
                  className="h-12 text-base text-center tracking-widest"
                  maxLength={6}
                  value={smsCode}
                  onChange={(e) => setSmsCode(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setCodeSent(false)}
                  className="text-sm hover:underline w-full text-center"
                  style={{ color: "#1A2B4A" }}
                >
                  Изменить номер телефона
                </button>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 text-base rounded-xl"
              style={{ backgroundColor: "#1A2B4A" }}
            >
              {codeSent ? "Войти" : "Получить код"}
            </Button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-[10px] tracking-[0.15em] uppercase text-gray-400 mb-3">
            При поддержке
          </p>
          <div className="flex items-center justify-center gap-2">
            <img
              src={vtsLogo}
              alt="ВостокТехноСервис — Научно-Технический Центр"
              className="h-12 w-auto"
            />
          </div>
          <p className="text-xs text-gray-400 mt-3">
            © 2026 Work Helper. Все права защищены
          </p>
        </div>
      </div>
    </div>
  );
}