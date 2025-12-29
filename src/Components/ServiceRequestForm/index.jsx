"use client";
//imports
import React, { useEffect, useState } from "react";
import { Box, Typography, Button, CircularProgress, Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { allProvinces, citiesOfProvince } from "iran-city";

// ZOD schema for validation

const schema = z.object({
  fullName: z.string()
    .min(1, "لطفاً نام و نام خانوادگی را وارد کنید")
    .regex(/^[\u0600-\u06FFa-zA-Z\s]+$/, "نام فقط باید شامل حروف باشد"),
  mobile: z.string()
    .regex(/^09\d{9}$/, "شماره موبایل معتبر نیست (مثال: 09123456789)"),
  province: z.string().min(1, "لطفاً استان را انتخاب کنید"),
  city: z.string().min(1, "لطفاً شهر را انتخاب کنید"),
  productId: z.string().min(1, "لطفاً محصول را انتخاب کنید"),
  description: z.string().min(10, "توضیحات باید حداقل ۱۰ کاراکتر باشد"),
});

//service req form comp

const ServiceRequestForm = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [products, setProducts] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      mobile: "",
      province: "",
      city: "",
      productId: "",
      description: "",
    },
  });

  const selectedProvince = watch("province");

  useEffect(() => {
    setProvinces(allProvinces());
    (async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error();
        setProducts(await res.json());
      } catch {
        setMessage({ type: "error", text: "خطا در دریافت لیست محصولات" });
      } finally {
        setIsLoadingProducts(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      setCities(citiesOfProvince(Number(selectedProvince)));
      setValue("city", "");
    } else {
      setCities([]);
    }
  }, [selectedProvince, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage(null);

    const provinceObj = provinces.find(p => p.id.toString() === data.province);
    const cityObj = cities.find(c => c.id.toString() === data.city);
    const productObj = products.find(p => p.id.toString() === data.productId);

    const payload = {
      fullName: data.fullName,
      mobile: data.mobile,
      provinceTitle: provinceObj?.name || "",
      cityTitle: cityObj?.name || "",
      productTitle: productObj?.title || "",
      description: data.description,
    };

    try {
      const res = await fetch("/api/submitPurchaseRequest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message);
      setMessage({ type: "success", text: "درخواست با موفقیت ارسال شد!" });
      // ریست فرم
      ["fullName", "mobile", "province", "city", "productId", "description"]
        .forEach(f => setValue(f, ""));
    } catch (err) {
      setMessage({ type: "error", text: err.message || "خطا در ارسال فرم." });
    } finally {
      setLoading(false);
    }
  };

  const InputField = ({ label, name, select = false, options = [], disabled = false, type = "text", inputMode, maxLength }) => (
    <div className="relative mb-4">
      {select
        ? <select
          id={name}
          {...register(name)}
          disabled={disabled}
          style={{
            backgroundColor: "#ffffff",
            color: "#000000",
            border: `2px solid ${errors[name] ? "#EF4444" : "#d1d5db"}`,
            borderRadius: "0.5rem",
            width: "100%",
            padding: "1rem",
            fontSize: "0.875rem",
            textAlign: "right",
            appearance: "none",
            backgroundImage: "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e\")",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "left 1rem center",
            backgroundSize: "1rem",
          }}
        >
          <option value="">{label === "استان" ? "انتخاب کنید" : "ابتدا استان را انتخاب کنید"}</option>
          {options.map(opt => (
            <option key={opt.id || opt} value={opt.id || opt} style={{ color: "#000000" }}>
              {opt.name || opt.title || opt}
            </option>
          ))}
        </select>
        : <input
          id={name}
          {...register(name)}
          type={type}
          inputMode={inputMode}
          maxLength={maxLength}
          style={{
            backgroundColor: "#ffffff",
            color: "#000000",
            border: `2px solid ${errors[name] ? "#EF4444" : "#d1d5db"}`,
            borderRadius: "0.5rem",
            width: "100%",
            padding: "1rem",
            fontSize: "0.875rem",
          }}
          className={inputMode === "numeric" ? "text-right" : ""}
        />
      }
      <label
        htmlFor={name}
        style={{
          position: "absolute",
          right: "1rem",
          top: "-0.5rem",
          fontSize: "0.75rem",
          backgroundColor: "#ffffff",
          color: "#6b7280",
          padding: "0 0.25rem",
        }}
      >
        {label}
      </label>
      {errors[name] && <p style={{ color: "#EF4444", fontSize: "0.75rem", marginTop: "0.25rem" }}>{errors[name].message}</p>}
    </div>
  );

  return (
    <Box sx={{
      py: 6,
      px: 2,
      backgroundColor: "grey.200",
      minHeight: "100vh"
    }}>
      <Box sx={{
        maxWidth: 600,
        mx: "auto",
        bgcolor: "#ffffff",
        p: 4,
        borderRadius: 2,
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        border: "1px solid #e5e7eb"
      }}>
        <Typography
          variant="h4"
          align="center"
          sx={{
            mb: 3,
            fontWeight: 700,
            color: "#000000",
            fontSize: { xs: "1.5rem", sm: "2rem" }
          }}
        >
          فرم درخواست خرید
        </Typography>

        {message && (
          <Alert severity={message.type} sx={{
            mb: 3,
            backgroundColor: message.type === "error" ? "#FEE2E2" : "#DCFCE7",
            color: message.type === "error" ? "#B91C1C" : "#166534"
          }}>
            {message.text}
          </Alert>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <InputField label="نام و نام خانوادگی" name="fullName" />
          <InputField label="موبایل" name="mobile" type="tel" inputMode="numeric" maxLength={11} />

          <InputField
            label="استان"
            name="province"
            select
            options={provinces}
          />

          <InputField
            label="شهر"
            name="city"
            select
            options={cities}
            disabled={!selectedProvince}
          />

          <InputField
            label="نام محصول"
            name="productId"
            select
            options={products}
            disabled={isLoadingProducts}
          />

          {isLoadingProducts && (
            <div className="text-center py-2">
              <CircularProgress size={24} />
              <p className="text-gray-800 text-sm mt-2">در حال دریافت لیست محصولات...</p>
            </div>
          )}

          <InputField
            label="توضیح مختصر درباره مشکل محصول"
            name="description"
          />

          <Box textAlign="center" mt={4}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading || isLoadingProducts}
              sx={{
                px: 6,
                py: 1.5,
                backgroundColor: "#2563eb",
                color: "#ffffff",
                "&:hover": { backgroundColor: "#1d4ed8" },
                fontSize: { xs: "0.9rem", sm: "1rem" }
              }}
            >
              {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "ثبت درخواست"}
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
export default ServiceRequestForm;