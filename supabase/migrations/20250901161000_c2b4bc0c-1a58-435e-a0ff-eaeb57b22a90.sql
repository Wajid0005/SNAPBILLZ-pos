-- Fix the function search path security issue
CREATE OR REPLACE FUNCTION public.log_review_to_sheets()
RETURNS trigger 
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- This will be handled by the edge function
  -- Just return the new record for now
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;