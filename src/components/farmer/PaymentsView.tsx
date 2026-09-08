import React, { useState } from 'react';
import {
  DollarSign,
  CheckCircle2,
  Download,
  Receipt,
  ArrowUpRight,
  Clock,
  ShieldCheck,
  TrendingUp,
  CreditCard,
  Building2,
  Calendar
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PaymentsView: React.FC = () => {
  const { payments, user, showToast } = useApp();
  const [selectedPayment, setSelectedPayment] = useState(payments[0]);

  const totalEarned = payments.reduce((acc, p) => acc + p.netAmount, 0);

  const handleDownloadReceipt = (ref: string) => {
    showToast(`Invoice receipt downloaded: ${ref}.pdf`);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Escrow & Verified Settlements
            </span>
            <span className="text-xs text-slate-400 font-medium">Instant Direct Bank Deposit</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight mt-1">
            Farmer Earnings & Payout Statements
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Transparent breakdown of gross trade value, freight deduction, platform fee, and net take-home pay.
          </p>
        </div>

        {/* Total Earned Card */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-4 px-6 rounded-2xl shadow-md self-start md:self-auto">
          <span className="text-[10px] uppercase font-bold text-emerald-200 block">Total Lifetime Settlements</span>
          <span className="text-2xl font-black">₹{totalEarned.toLocaleString('en-IN')}</span>
        </div>
      </div>

      {/* Main Grid: Settlement Breakdown Card + Transaction History */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Settlement Voucher / Invoice Card */}
        <div className="lg:col-span-1 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-5 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Receipt className="w-4 h-4 text-emerald-600" />
                <h3 className="font-bold text-slate-900 text-sm">Settlement Voucher</h3>
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full uppercase">
                {selectedPayment?.status || 'Paid'}
              </span>
            </div>

            <div className="p-5 space-y-4 text-xs">
              
              <div className="text-center py-2 border-b border-dashed border-slate-200">
                <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Net Amount Deposited</span>
                <div className="text-3xl font-black text-emerald-700 mt-1">
                  ₹{selectedPayment?.netAmount.toLocaleString('en-IN')}
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Txn Ref: <strong className="font-mono text-slate-700">{selectedPayment?.transactionRef}</strong>
                </p>
              </div>

              {/* Itemized Deductions */}
              <div className="space-y-2.5 text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-500">Produce:</span>
                  <span className="font-bold text-slate-800">{selectedPayment?.quantityKg} kg {selectedPayment?.crop}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Agreed Price / kg:</span>
                  <span className="font-bold text-slate-800">₹{selectedPayment?.pricePerKg}/kg</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-100 font-semibold text-slate-800">
                  <span>Gross Produce Value:</span>
                  <span>₹{selectedPayment?.grossAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>(-) Logistics Transport Freight:</span>
                  <span className="font-bold">-₹{selectedPayment?.transportCost.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>(-) AgriAgent Fee (1%):</span>
                  <span>-₹{selectedPayment?.platformFee}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200 text-sm font-extrabold text-emerald-800">
                  <span>Take-Home Net Payout:</span>
                  <span>₹{selectedPayment?.netAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-1.5 text-[11px] text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>State Bank of India (A/C: ****3341)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Settlement Date: {selectedPayment?.paymentDate}</span>
                </div>
              </div>

            </div>
          </div>

          <div className="p-5 pt-0">
            <button
              onClick={() => handleDownloadReceipt(selectedPayment?.transactionRef || 'AGRI-PAY')}
              className="w-full py-2.5 px-4 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center justify-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>Download Tax Invoice (PDF)</span>
            </button>
          </div>
        </div>

        {/* Transaction History Table */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">Settlement History</h3>
              <span className="text-xs text-slate-500 font-medium">{payments.length} verified transactions</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/30">
                    <th className="py-3.5 px-5">Order & Crop</th>
                    <th className="py-3.5 px-4">Buyer</th>
                    <th className="py-3.5 px-4 text-right">Gross</th>
                    <th className="py-3.5 px-4 text-right">Freight</th>
                    <th className="py-3.5 px-4 text-right">Net Payout</th>
                    <th className="py-3.5 px-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                  {payments.map(item => {
                    const isSelected = selectedPayment?.id === item.id;
                    return (
                      <tr
                        key={item.id}
                        onClick={() => setSelectedPayment(item)}
                        className={`cursor-pointer transition-colors ${
                          isSelected ? 'bg-emerald-50/70 font-semibold' : 'hover:bg-slate-50'
                        }`}
                      >
                        <td className="py-3.5 px-5">
                          <div className="font-bold text-slate-900">{item.orderId}</div>
                          <span className="text-[11px] text-slate-500 font-normal">
                            {item.quantityKg} kg {item.crop}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-800">{item.buyerName}</td>
                        <td className="py-3.5 px-4 text-right">₹{item.grossAmount.toLocaleString('en-IN')}</td>
                        <td className="py-3.5 px-4 text-right text-red-600 font-medium">-₹{item.transportCost}</td>
                        <td className="py-3.5 px-4 text-right font-extrabold text-emerald-700 text-sm">
                          ₹{item.netAmount.toLocaleString('en-IN')}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Paid
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Escrow Guarantee: Funds are deposited in escrow before transport dispatch and released upon digital delivery receipt.</span>
          </div>
        </div>

      </div>

    </div>
  );
};
