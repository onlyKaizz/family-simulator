import { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { Wallet, Landmark, Car, Home, TrendingUp } from 'lucide-react';

export const AssetsPanel = () => {
  const { character } = useGameStore();
  const [savingsInput, setSavingsInput] = useState('');

  if (!character) return null;

  const totalVehiclesValue = character.finances.vehicles.reduce((sum, v) => sum + v.value, 0);
  const totalRealEstateValue = character.finances.realEstate.reduce((sum, r) => sum + r.value, 0);
  const netWorth = character.finances.cash + character.finances.savings + totalVehiclesValue + totalRealEstateValue;

  const handleDeposit = () => {
    const amount = parseInt(savingsInput) * 1000000;
    if (isNaN(amount) || amount <= 0 || amount > character.finances.cash) return;

    character.finances.cash -= amount;
    character.finances.savings += amount;
    setSavingsInput('');
  };

  const handleWithdraw = () => {
    const amount = parseInt(savingsInput) * 1000000;
    if (isNaN(amount) || amount <= 0 || amount > character.finances.savings) return;

    character.finances.savings -= amount;
    character.finances.cash += amount;
    setSavingsInput('');
  };

  return (
    <div className="space-y-4 text-left pb-8">
      
      {/* Tổng tài sản ròng */}
      <div className="bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/30 rounded-2xl p-5 shadow-lg">
        <span className="text-xs font-semibold text-amber-400/90 uppercase tracking-wider block">
          Tổng Tài Sản Ròng
        </span>
        <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 mt-1">
          {(netWorth / 1e6).toLocaleString('vi-VN', { maximumFractionDigits: 1 })} triệu đ
        </div>
        <p className="text-[11px] text-slate-400 mt-1">
          Bao gồm tiền mặt trong ví, sổ tiết kiệm ngân hàng, phương tiện và bất động sản.
        </p>
      </div>

      {/* Tiền mặt & Tiết kiệm ngân hàng */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 space-y-1">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
            <Wallet className="w-4 h-4" /> Tiền mặt trong ví
          </div>
          <div className="text-xl font-bold text-white">
            {(character.finances.cash / 1e6).toLocaleString('vi-VN', { maximumFractionDigits: 1 })} tr đ
          </div>
          <span className="text-[11px] text-slate-400 block">Sẵn sàng chi tiêu bất cứ lúc nào</span>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 space-y-1">
          <div className="flex items-center justify-between text-sky-400 text-xs font-bold">
            <span className="flex items-center gap-1.5"><Landmark className="w-4 h-4" /> Sổ tiết kiệm (6%/năm)</span>
            <span className="text-[10px] bg-sky-500/20 text-sky-300 px-1.5 py-0.5 rounded">Có lãi kép</span>
          </div>
          <div className="text-xl font-bold text-white">
            {(character.finances.savings / 1e6).toLocaleString('vi-VN', { maximumFractionDigits: 1 })} tr đ
          </div>
          <span className="text-[11px] text-slate-400 block">Tự động sinh lãi sau mỗi năm sống</span>
        </div>
      </div>

      {/* Thao tác ngân hàng */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 space-y-3">
        <h4 className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
          <TrendingUp className="w-4 h-4 text-amber-400" /> Quản lý Tiết Kiệm Ngân Hàng
        </h4>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Số tiền (triệu đ)..."
            value={savingsInput}
            onChange={(e) => setSavingsInput(e.target.value)}
            className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
          <button
            onClick={handleDeposit}
            className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition shadow"
          >
            Gửi vào
          </button>
          <button
            onClick={handleWithdraw}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition"
          >
            Rút ra
          </button>
        </div>
      </div>

      {/* Xe cộ */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-3">
        <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
          <Car className="w-4 h-4 text-purple-400" /> Phương Tiện Đi Lại ({character.finances.vehicles.length})
        </h3>
        {character.finances.vehicles.length > 0 ? (
          <div className="space-y-2">
            {character.finances.vehicles.map((v, i) => (
              <div key={i} className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/40 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-white block">{v.name}</span>
                  <span className="text-slate-400">{v.type}</span>
                </div>
                <span className="font-bold text-emerald-400">{(v.value / 1e6).toFixed(1)} tr đ</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400 italic">Bạn chưa sở hữu phương tiện nào.</p>
        )}
      </div>

      {/* Bất động sản */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-3">
        <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
          <Home className="w-4 h-4 text-amber-400" /> Bất Động Sản & Nhà Đất ({character.finances.realEstate.length})
        </h3>
        {character.finances.realEstate.length > 0 ? (
          <div className="space-y-2">
            {character.finances.realEstate.map((r, i) => (
              <div key={i} className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/40 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-white block">{r.name}</span>
                  <span className="text-slate-400">Giá thị trường</span>
                </div>
                <span className="font-bold text-amber-400">{(r.value / 1e6).toFixed(1)} tr đ</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400 italic">Bạn chưa sở hữu nhà riêng hoặc đất đai.</p>
        )}
      </div>

    </div>
  );
};
