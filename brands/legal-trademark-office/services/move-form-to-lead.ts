import LegalTrademarkOfficeForm from "../models/form-model.js";
import LegalTrademarkOfficeLead from "../models/leads-model.js";

export const MoveFormToLead = async (formId: string) => {
  try {
    const formData = await LegalTrademarkOfficeForm.findOne({ formId });

    if (!formData) {
      throw new Error("Form not found.");
    }

    await LegalTrademarkOfficeLead.findOneAndUpdate(
      { formId },
      { ...formData.toObject() },
      { upsert: true, new: true }
    );
  } catch (error: any) {
    console.error("Error in MoveFormToLead:", error.message);
  }
};
