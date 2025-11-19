import * as PayrollModel from '../../models/Employee/payrollModel.js';

export const getMyPayroll = async (req, res) => {
  try {
    const userId = req.user?.id;
    
    console.log('💰 Fetching payroll for userId:', userId);
    
    if (!userId) {
      return res.status(400).json({ error: "User ID required" });
    }

    const payroll = await PayrollModel.getPayrollRecords(userId);
    
    console.log('✅ Payroll records found:', payroll?.length || 0);
    
    // ✅ Always return array
    res.json(payroll || []);
  } catch (error) {
    console.error('❌ Payroll Error:', error);
    res.status(500).json({ error: error.message });
  }
};
