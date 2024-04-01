namespace Server.Util
{
    public class UnitUtil
    {
        public static List<string> convertToAmerican(List<string> ingredientsIn)
        {
            List<string> ingredients = new List<string>();

            foreach (string ing in ingredientsIn)
            {
                string[] words = ing.Split(' ');
                string amountString = words[words.Length - 2];
                double amount = double.Parse(amountString);
                string unit = words.Last();

                if (unit == "kg")
                {
                    amount = amount / 0.4536;
                    unit = "lb";
                }
                else if (unit == "g")
                {
                    amount = amount / 28.3495;
                    unit = "oz";
                }
                else if (unit == "ml" && amount < 14)
                {
                    amount = amount / 4.9289;
                    unit = "tsp";
                }
                else if (unit == "ml" && amount < 29)
                {
                    amount = amount / 14.7867;
                    unit = "tbsp";
                }
                else if (unit == "ml" && amount < 236)
                {
                    amount = amount / 29.5735;
                    unit = "floz";
                }
                else if (unit == "ml")
                {
                    amount = amount / 236.5882;
                    unit = "cups";
                }

                var result = string.Empty;

                for (int i = 0; i < words.Length - 2; i++)
                {
                    result += words[i];
                    result += " ";
                }
                result += amount;
                result += " ";
                result += unit;

                ingredients.Add(result);
            }

            return ingredients;
        }

        public static List<string> convertFromAmerican(List<string> ingredientsIn)
        {
            List<string> ingredients = new List<string>();

            foreach (string ing in ingredientsIn)
            {
                string[] words = ing.Split(' ');
                string amountString = words[words.Length - 2];
                double amount = double.Parse(amountString);
                string unit = words.Last();

                if (unit == "lb")
                {
                    amount = amount * 0.4536;
                    unit = "kg";
                }
                else if (unit == "oz")
                {
                    amount = amount * 28.3495;
                    unit = "g";
                }
                else if (unit == "tbsp")
                {
                    amount = amount * 14.7867;
                    unit = "ml";
                }
                else if (unit == "tsp")
                {
                    amount = amount * 4.9289;
                    unit = "ml";
                }
                else if (unit == "floz")
                {
                    amount = amount * 29.5735;
                    unit = "ml";
                }
                else if (unit == "cups")
                {
                    amount = amount * 236.5882;
                    unit = "ml";
                }

                if (unit == "ml" && amount > 1000)
                {
                    unit = "l";
                    amount = amount / 1000.0;
                }

                var result = string.Empty;

                for (int i = 0; i < words.Length - 2; i++)
                {
                    result += words[i];
                    result += " ";
                }
                result += amount;
                result += " ";
                result += unit;

                ingredients.Add(result);
            }

            return ingredients;
        }
    }
}
