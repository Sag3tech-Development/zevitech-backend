import LtoAccounts from "../models/legal-trademark-office/lto-accounts-model.js";
import LtoForm from "../models/legal-trademark-office/lto-form-model.js";
import LtoLeads from "../models/legal-trademark-office/lto-leads-model.js";

export const MoveToLtoLeads = async (formId: string) => {
  try {
    const formData = await LtoForm.findOne({ formId });

    if (!formData) {
      throw new Error("Form not found.");
    }

    await LtoLeads.create({ ...formData.toObject() });
  } catch (error: any) {
    console.error("Error in MoveToLtoLeads:", error.message);
  }
};

export const MoveToLtoAccounts = async (formId: string) => {
  try {
    const formData = await LtoForm.findOne({ formId });

    if (!formData) {
      throw new Error("Form not found.");
    }

    await LtoAccounts.create({ ...formData.toObject() });

    await LtoForm.findByIdAndDelete(formData._id);
    await LtoLeads.findOneAndDelete({ formId });
  } catch (error: any) {
    console.error("Error in MoveToLtoAccounts:", error.message);
  }
};
