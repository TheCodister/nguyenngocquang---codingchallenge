import { NextFunction, Request, Response } from "express";
import prisma from "../config/db";

// Create a new conversion history
export const createConversion = async (req: Request, res: Response) => {
  try {
    const { fromCurrency, toCurrency, fromAmount, toAmount } = req.body;
    const conversion = await prisma.conversion.create({
      data: { fromCurrency, toCurrency, fromAmount, toAmount },
    });
    res.status(201).json(conversion);
  } catch (error) {
    res.status(500).json({ error: "Failed to create conversion" });
  }
};

// Get all conversion histories
export const getConversions = async (req: Request, res: Response) => {
  try {
    const conversions = await prisma.conversion.findMany();
    res.status(200).json(conversions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch conversions" });
  }
};

// Get a single conversion by ID
export const getConversionById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const conversion = await prisma.conversion.findUnique({
      where: { id },
    });

    if (!conversion) {
      return res.status(404).json({ error: "Conversion not found" });
    }

    return res.json(conversion);
  } catch (error) {
    next(error);
    console.error("Error fetching conversion:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update conversion by ID
export const updateConversion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { fromCurrency, toCurrency, fromAmount, toAmount } = req.body;
    const updated = await prisma.conversion.update({
      where: { id },
      data: { fromCurrency, toCurrency, fromAmount, toAmount },
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update conversion" });
  }
};

// Delete conversion by ID
export const deleteConversion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.conversion.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete conversion" });
  }
};
