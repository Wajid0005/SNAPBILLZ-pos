-- Create edge function for Google Sheets integration
-- This will store review data to Google Sheets
CREATE OR REPLACE FUNCTION public.log_review_to_sheets()
RETURNS trigger AS $$
BEGIN
  -- This will be handled by the edge function
  -- Just return the new record for now
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;