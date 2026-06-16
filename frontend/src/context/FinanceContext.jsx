import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import api from "../lib/api";
import { sanitizeInput } from "../lib/utils";

// Accounts will be loaded from the database dynamically

const FinanceContext = createContext(undefined);

const defaultRule = {
  enabled: false,
  type: "percent",
  value: 10,
  targetGoalId: "",
};

export function FinanceProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [goals, setGoals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [allAccounts, setAllAccounts] = useState([]);

  // Clear all user-specific data (called on logout or account switch)
  const clearUserData = () => {
    setTransactions([]);
    setGoals([]);
    setCategories([]);
    setAutoSaveRule(defaultRule);
  };

  const fetchUsers = async () => {
    try {
      const res = await api.get("/usuarios");
      const mapped = res.data.map((u) => {
        const parts = u.nombre.split(/\s+/).filter(Boolean);
        let initials = "U";
        if (parts.length >= 2) {
          initials = (parts[0][0] + parts[1][0]).toUpperCase();
        } else if (parts.length === 1) {
          initials = parts[0].substring(0, 2).toUpperCase();
        }

        return {
          id: String(u.id),
          name: u.nombre,
          email: u.gmail,
          password: u.password,
          initials,
          gender: u.genero || "male",
        };
      });
      setAllAccounts(mapped);
      return mapped;
    } catch (err) {
      console.error("Error fetching users from API:", err);
      return [];
    }
  };
  
  const [autoSaveRule, setAutoSaveRule] = useState(defaultRule);

  // Transition states for secure account switching
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionStep, setTransitionStep] = useState(0);
  const [transitionUser, setTransitionUser] = useState(null);

  // Persist autoSaveRule per-user so different accounts don't share the same rule
  useEffect(() => {
    if (currentUser?.id) {
      localStorage.setItem(`finance_autosave_rule_${currentUser.id}`, JSON.stringify(autoSaveRule));
    }
  }, [autoSaveRule, currentUser]);

  // Load the correct autoSaveRule whenever the active user changes
  useEffect(() => {
    if (currentUser?.id) {
      const saved = localStorage.getItem(`finance_autosave_rule_${currentUser.id}`);
      setAutoSaveRule(saved ? JSON.parse(saved) : defaultRule);
    } else {
      setAutoSaveRule(defaultRule);
    }
  }, [currentUser?.id]);

  // Trigger animated transition when switching users
  const triggerTransition = (user, callback) => {
    setTransitionUser(user);
    setIsTransitioning(true);
    setTransitionStep(0);

    const t0 = setTimeout(() => setTransitionStep(1), 400);
    const t1 = setTimeout(() => setTransitionStep(2), 800);
    const t2 = setTimeout(() => setTransitionStep(3), 1200);
    const t3 = setTimeout(() => {
      if (callback) {
        callback();
      } else {
        setCurrentUser(user);
      }
    }, 1600);
    const t4 = setTimeout(() => {
      setIsTransitioning(false);
      setTransitionUser(null);
    }, 1900);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  };

  // User authentication
  const loginUser = async (email, password) => {
    try {
      const res = await api.post("/usuarios/login", {
        gmail: email.trim(),
        password: password,
      });
      const u = res.data;

      const parts = u.nombre.split(/\s+/).filter(Boolean);
      let initials = "U";
      if (parts.length >= 2) {
        initials = (parts[0][0] + parts[1][0]).toUpperCase();
      } else if (parts.length === 1) {
        initials = parts[0].substring(0, 2).toUpperCase();
      }

      const loggedUser = {
        id: String(u.id),
        name: u.nombre,
        email: u.gmail,
        password: u.password,
        initials,
        gender: u.genero || "male",
      };

      triggerTransition(loggedUser, () => {
        clearUserData();
        setCurrentUser(loggedUser);
        fetchAllData(loggedUser);
        toast.success(`Bienvenido de nuevo, ${loggedUser.name}`);
      });
      return true;
    } catch (err) {
      console.error("Login error:", err);
      return false;
    }
  };

  const registerUser = async (name, email, password, gender) => {
    const sanitizedEmail = sanitizeInput(email).trim().toLowerCase();
    const sanitizedName = sanitizeInput(name).trim();
    const sanitizedPassword = password.trim();

    if (!sanitizedName || !sanitizedEmail || !sanitizedPassword) {
      toast.error("Por favor completa los campos correctamente.");
      return false;
    }

    const emailExists = allAccounts.some((u) => u.email.toLowerCase() === sanitizedEmail);
    if (emailExists) {
      toast.error("Este correo electrónico ya está registrado.");
      return false;
    }

    try {
      const res = await api.post("/usuarios", {
        nombre: sanitizedName,
        gmail: sanitizedEmail,
        password: sanitizedPassword,
        genero: gender,
      });
      const u = res.data;

      const parts = u.nombre.split(/\s+/).filter(Boolean);
      let initials = "U";
      if (parts.length >= 2) {
        initials = (parts[0][0] + parts[1][0]).toUpperCase();
      } else if (parts.length === 1) {
        initials = parts[0].substring(0, 2).toUpperCase();
      }

      const newUser = {
        id: String(u.id),
        name: u.nombre,
        email: u.gmail,
        password: u.password,
        initials,
        gender: u.genero || "male",
      };

      await fetchUsers();

      triggerTransition(newUser, () => {
        clearUserData();
        setCurrentUser(newUser);
        fetchAllData(newUser);
        toast.success(`Cuenta creada exitosamente. ¡Bienvenido, ${newUser.name}!`);
      });

      return true;
    } catch (err) {
      console.error("Registration error:", err);
      toast.error("No se pudo crear la cuenta en el servidor.");
      return false;
    }
  };

  // Fetch all backend data helper
  const fetchAllData = async (userObj) => {
    if (!userObj) return;
    try {
      // 1. Fetch categories
      const catRes = await api.get("/categorias");
      setCategories(catRes.data);

      // 2. Fetch goals
      const goalsRes = await api.get(`/metas?usuarioId=${userObj.id}`);
      const mappedGoals = goalsRes.data
        .map((g) => ({
          id: String(g.id),
          name: g.nombre,
          target: Number(g.montoObjetivo),
          current: Number(g.montoActual),
          deadline: g.fechaLimite || "",
        }));
      setGoals(mappedGoals);

      // 3. Fetch transactions
      const txRes = await api.get(`/transacciones?usuarioId=${userObj.id}`);
      const mappedTxs = txRes.data
        .map((t) => ({
          id: String(t.id),
          description: t.descripcion,
          amount: Number(t.monto),
          type: t.tipo === "INGRESO" ? "income" : "expense",
          category: t.categoriaNombre,
          date: t.fecha,
          status: t.estado || "Completado",
        }))
        .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort descending by date
      setTransactions(mappedTxs);
    } catch (err) {
      console.error("Error fetching data from API:", err);
    }
  };

  // Mount logic: No auto-login, user must authenticate first
  useEffect(() => {
    fetchUsers();
    const savedUser = localStorage.getItem("finance_current_user");
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setCurrentUser(user);
        fetchAllData(user);
      } catch (err) {
        console.error("Failed to load saved user:", err);
      }
    }
  }, []);

  // Sync current user with localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("finance_current_user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("finance_current_user");
    }
  }, [currentUser]);

  // Helper to find or create a category in backend
  const getOrCreateCategory = async (catName, txType) => {
    const sanitizedCat = sanitizeInput(catName);
    if (!sanitizedCat) throw new Error("La categoría no puede estar vacía.");

    const existing = categories.find(
      (c) => c.nombre.toLowerCase() === sanitizedCat.toLowerCase()
    );
    if (existing) return existing;

    // Create a new category on backend
    const apiType = txType === "income" ? "INGRESO" : "GASTO";
    const res = await api.post("/categorias", {
      nombre: sanitizedCat,
      descripcion: `Categoría creada automáticamente`,
      tipo: apiType,
    });
    
    // Refresh local cache of categories
    const catRes = await api.get("/categorias");
    setCategories(catRes.data);
    return res.data;
  };

  const addTransaction = async (newTxData) => {
    try {
      if (!currentUser) throw new Error("Usuario no autenticado");

      const numericAmount = Number(newTxData.amount);
      if (isNaN(numericAmount) || numericAmount <= 0) {
        throw new Error("El monto de la transacción debe ser un número positivo mayor que cero.");
      }

      const sanitizedDesc = sanitizeInput(newTxData.description);
      if (!sanitizedDesc) {
        throw new Error("La descripción no puede estar vacía.");
      }

      // 1. Get or create category
      const targetCategory = await getOrCreateCategory(newTxData.category, newTxData.type);

      // 2. POST transaction to backend
      const apiType = newTxData.type === "income" ? "INGRESO" : "GASTO";
      const txPayload = {
        descripcion: sanitizedDesc,
        monto: Number(numericAmount.toFixed(2)),
        fecha: newTxData.date,
        tipo: apiType,
        estado: newTxData.status || "Completado",
        usuarioId: currentUser.id,
        categoriaId: targetCategory.id,
      };

      await api.post("/transacciones", txPayload);
      toast.success("Transacción registrada correctamente");

      // 3. Process AutoSave rule
      if (newTxData.type === "income" && autoSaveRule.enabled && autoSaveRule.targetGoalId) {
        const targetGoal = goals.find((g) => g.id === autoSaveRule.targetGoalId);
        if (targetGoal) {
          const remainingNeeded = targetGoal.target - targetGoal.current;
          if (remainingNeeded > 0) {
            let amountToSave = 0;
            if (autoSaveRule.type === "percent") {
              amountToSave = Number(((numericAmount * autoSaveRule.value) / 100).toFixed(2));
            } else {
              amountToSave = autoSaveRule.value;
            }

            const finalAutoSave = Math.min(amountToSave, remainingNeeded);
            if (finalAutoSave > 0) {
              // Deduct / allocate funds automatically in backend Goal
              await api.patch(`/metas/${targetGoal.id}/fondos`, { monto: finalAutoSave });

              // Find or create "Ahorro" category
              const savingCategory = await getOrCreateCategory("Ahorro", "expense");

              // Register system saving transaction
              const autoSavingTxPayload = {
                descripcion: `Ahorro Auto: ${targetGoal.name}`,
                monto: finalAutoSave,
                fecha: newTxData.date,
                tipo: "GASTO",
                estado: "Completado",
                usuarioId: currentUser.id,
                categoriaId: savingCategory.id,
              };

              await api.post("/transacciones", autoSavingTxPayload);
              toast.success(
                `Ahorro Automático (${
                  autoSaveRule.type === "percent" ? `${autoSaveRule.value}%` : `$${autoSaveRule.value}`
                }): Se aportó $${finalAutoSave.toFixed(2)} a la meta "${targetGoal.name}"`
              );
            }
          }
        }
      }

      await fetchAllData(currentUser);
    } catch (error) {
      console.error("Error al registrar transacción:", error);
      toast.error(error.message || "Error al registrar la transacción.");
    }
  };

  const updateTransaction = async (id, updatedFields) => {
    try {
      if (!currentUser) throw new Error("Usuario no autenticado");

      const originalTx = transactions.find((t) => t.id === id);
      if (!originalTx) {
        throw new Error("No se encontró la transacción original.");
      }

      // Validations and sanitization
      let sanitizedFields = { ...updatedFields };

      if (updatedFields.amount !== undefined) {
        const numericAmount = Number(updatedFields.amount);
        if (isNaN(numericAmount) || numericAmount <= 0) {
          throw new Error("El monto de la transacción debe ser un número positivo mayor que cero.");
        }
        sanitizedFields.amount = Number(numericAmount.toFixed(2));
      }

      if (updatedFields.description !== undefined) {
        const sanitizedDesc = sanitizeInput(updatedFields.description);
        if (!sanitizedDesc) {
          throw new Error("La descripción no puede estar vacía.");
        }
        sanitizedFields.description = sanitizedDesc;
      }

      const oldCategoryName = originalTx.category;
      const oldDesc = originalTx.description;
      const oldAmount = originalTx.amount;
      const oldType = originalTx.type;

      const newCategoryName = sanitizedFields.category !== undefined ? sanitizedFields.category : oldCategoryName;
      const newDesc = sanitizedFields.description !== undefined ? sanitizedFields.description : oldDesc;
      const newAmount = sanitizedFields.amount !== undefined ? Number(sanitizedFields.amount) : oldAmount;
      const newType = sanitizedFields.type !== undefined ? sanitizedFields.type : oldType;

      // 1. Get or create category
      const targetCategory = await getOrCreateCategory(newCategoryName, newType);

      // 2. PUT transaction update
      const apiType = newType === "income" ? "INGRESO" : "GASTO";
      const txPayload = {
        descripcion: newDesc,
        monto: newAmount,
        fecha: sanitizedFields.date !== undefined ? sanitizedFields.date : originalTx.date,
        tipo: apiType,
        estado: sanitizedFields.status !== undefined ? sanitizedFields.status : originalTx.status,
        usuarioId: currentUser.id,
        categoriaId: targetCategory.id,
      };

      await api.put(`/transacciones/${id}`, txPayload);

      // 3. Goal synchronization logic (in case we changed "Ahorro" transaction amount or linked goal)
      const oldMatchedGoal = goals.find((g) => 
        oldCategoryName === "Ahorro" && oldDesc.endsWith(`: ${g.name}`)
      );
      const newMatchedGoal = goals.find((g) => 
        newCategoryName === "Ahorro" && newDesc.endsWith(`: ${g.name}`)
      );

      const oldContribution = oldType === "expense" ? oldAmount : -oldAmount;
      const newContribution = newType === "expense" ? newAmount : -newAmount;

      if (oldMatchedGoal && newMatchedGoal && oldMatchedGoal.id === newMatchedGoal.id) {
        const diff = Number((newContribution - oldContribution).toFixed(2));
        if (diff !== 0) {
          // Adjust goal current amount
          const updatedCurrent = Math.max(0, oldMatchedGoal.current + diff);
          await api.put(`/metas/${oldMatchedGoal.id}`, {
            nombre: oldMatchedGoal.name,
            montoObjetivo: oldMatchedGoal.target,
            montoActual: updatedCurrent,
            fechaLimite: oldMatchedGoal.deadline || null,
            usuarioId: currentUser.id,
          });
        }
      } else {
        if (oldMatchedGoal) {
          const updatedCurrent = Math.max(0, oldMatchedGoal.current - oldContribution);
          await api.put(`/metas/${oldMatchedGoal.id}`, {
            nombre: oldMatchedGoal.name,
            montoObjetivo: oldMatchedGoal.target,
            montoActual: updatedCurrent,
            fechaLimite: oldMatchedGoal.deadline || null,
            usuarioId: currentUser.id,
          });
        }
        if (newMatchedGoal) {
          const updatedCurrent = newMatchedGoal.current + newContribution;
          await api.put(`/metas/${newMatchedGoal.id}`, {
            nombre: newMatchedGoal.name,
            montoObjetivo: newMatchedGoal.target,
            montoActual: updatedCurrent,
            fechaLimite: newMatchedGoal.deadline || null,
            usuarioId: currentUser.id,
          });
        }
      }

      toast.success("Transacción modificada correctamente");
      await fetchAllData(currentUser);
    } catch (error) {
      console.error("Error al modificar transacción:", error);
      toast.error(error.message || "Error al modificar la transacción.");
    }
  };

  const deleteTransaction = async (id) => {
    try {
      const originalTx = transactions.find((t) => t.id === id);
      if (!originalTx) throw new Error("Transacción no encontrada.");

      // 1. Delete on backend
      await api.delete(`/transacciones/${id}`);

      // 2. Adjust savings goal balance if this was a savings transaction
      const matchedGoal = goals.find((g) => 
        originalTx.category === "Ahorro" && originalTx.description.endsWith(`: ${g.name}`)
      );
      if (matchedGoal) {
        const contribution = originalTx.type === "expense" ? originalTx.amount : -originalTx.amount;
        const updatedCurrent = Math.max(0, matchedGoal.current - contribution);
        await api.put(`/metas/${matchedGoal.id}`, {
          nombre: matchedGoal.name,
          montoObjetivo: matchedGoal.target,
          montoActual: updatedCurrent,
          fechaLimite: matchedGoal.deadline || null,
          usuarioId: currentUser.id,
        });
      }

      toast.success("Transacción eliminada correctamente");
      await fetchAllData(currentUser);
    } catch (error) {
      console.error("Error al eliminar transacción:", error);
      toast.error(error.message || "Error al eliminar la transacción.");
    }
  };

  const addGoal = async (newGoalData) => {
    try {
      if (!currentUser) throw new Error("Usuario no autenticado");

      const sanitizedName = sanitizeInput(newGoalData.name);
      if (!sanitizedName) throw new Error("El nombre de la meta no puede estar vacío.");

      const targetVal = Number(newGoalData.target);
      if (isNaN(targetVal) || targetVal <= 0) {
        throw new Error("El monto objetivo debe ser un número positivo mayor a cero.");
      }

      const currentVal = Number(newGoalData.current || 0);
      if (isNaN(currentVal) || currentVal < 0) {
        throw new Error("El ahorro acumulado inicial no puede ser negativo.");
      }
      if (targetVal < currentVal) {
        throw new Error("El monto inicial acumulado no puede superar el monto objetivo.");
      }

      // POST to backend
      await api.post("/metas", {
        nombre: sanitizedName,
        montoObjetivo: targetVal,
        montoActual: currentVal,
        fechaLimite: newGoalData.deadline || null,
        usuarioId: currentUser.id,
      });

      toast.success("Meta creada exitosamente");
      await fetchAllData(currentUser);
    } catch (error) {
      console.error("Error al agregar meta:", error);
      toast.error(error.message || "Error al crear la meta.");
    }
  };

  const updateGoal = async (id, updatedFields) => {
    try {
      if (!currentUser) throw new Error("Usuario no autenticado");

      const originalGoal = goals.find((g) => g.id === id);
      if (!originalGoal) throw new Error("No se encontró la meta original.");

      let sanitizedFields = { ...updatedFields };

      if (updatedFields.name !== undefined) {
        const sanitizedName = sanitizeInput(updatedFields.name);
        if (!sanitizedName) throw new Error("El nombre de la meta no puede estar vacío.");
        sanitizedFields.name = sanitizedName;
      }

      if (updatedFields.target !== undefined) {
        const targetVal = Number(updatedFields.target);
        if (isNaN(targetVal) || targetVal <= 0) {
          throw new Error("El monto objetivo debe ser un número positivo mayor a cero.");
        }
        sanitizedFields.target = targetVal;
      }

      if (updatedFields.current !== undefined) {
        const currentVal = Number(updatedFields.current);
        if (isNaN(currentVal) || currentVal < 0) {
          throw new Error("El monto acumulado no puede ser negativo.");
        }
        sanitizedFields.current = currentVal;
      }

      const finalName = sanitizedFields.name !== undefined ? sanitizedFields.name : originalGoal.name;
      const finalTarget = sanitizedFields.target !== undefined ? sanitizedFields.target : originalGoal.target;
      const finalCurrent = sanitizedFields.current !== undefined ? sanitizedFields.current : originalGoal.current;

      if (finalTarget < finalCurrent) {
        throw new Error(`El monto objetivo ($${finalTarget}) no puede ser menor al monto acumulado ($${finalCurrent})`);
      }

      // 1. Sync backend Goal
      await api.put(`/metas/${id}`, {
        nombre: finalName,
        montoObjetivo: finalTarget,
        montoActual: finalCurrent,
        fechaLimite: sanitizedFields.deadline !== undefined ? sanitizedFields.deadline : (originalGoal.deadline || null),
        usuarioId: currentUser.id,
      });

      // 2. Adjust matching savings transactions if name or amount changed
      const oldName = originalGoal.name;
      const newName = finalName;
      let currentDiff = 0;
      if (sanitizedFields.current !== undefined) {
        currentDiff = Number((sanitizedFields.current - originalGoal.current).toFixed(2));
      }

      if (newName !== oldName || currentDiff !== 0) {
        // Find matching transactions
        const savingCategory = await getOrCreateCategory("Ahorro", "expense");
        
        // Find if there is an existing transaction for this goal
        const matchedTx = transactions.find((t) => 
          t.category === "Ahorro" && 
          (t.description === `Aporte Ahorro: ${newName}` || 
           t.description === `Ahorro Auto: ${newName}` ||
           t.description.endsWith(`: ${oldName}`) ||
           t.description.endsWith(`: ${newName}`))
        );

        if (newName !== oldName && matchedTx) {
          // Rename tx description
          const updatedDesc = matchedTx.description.replace(`: ${oldName}`, `: ${newName}`);
          await api.put(`/transacciones/${matchedTx.id}`, {
            descripcion: updatedDesc,
            monto: matchedTx.amount,
            fecha: matchedTx.date,
            tipo: matchedTx.type === "income" ? "INGRESO" : "GASTO",
            estado: matchedTx.status,
            usuarioId: currentUser.id,
            categoriaId: savingCategory.id,
          });
        }

        if (currentDiff !== 0) {
          if (matchedTx) {
            const updatedAmount = Number((matchedTx.amount + currentDiff).toFixed(2));
            if (updatedAmount < 0) {
              await api.put(`/transacciones/${matchedTx.id}`, {
                descripcion: matchedTx.description,
                monto: Math.abs(updatedAmount),
                fecha: matchedTx.date,
                tipo: "INGRESO",
                estado: matchedTx.status,
                usuarioId: currentUser.id,
                categoriaId: savingCategory.id,
              });
            } else {
              await api.put(`/transacciones/${matchedTx.id}`, {
                descripcion: matchedTx.description,
                monto: updatedAmount,
                fecha: matchedTx.date,
                tipo: "GASTO",
                estado: matchedTx.status,
                usuarioId: currentUser.id,
                categoriaId: savingCategory.id,
              });
            }
          } else {
            // Create a supporting saving adjustment transaction
            await api.post("/transacciones", {
              descripcion: `Aporte Ahorro: ${newName}`,
              monto: Math.abs(currentDiff),
              fecha: new Date().toISOString().split("T")[0],
              tipo: currentDiff > 0 ? "GASTO" : "INGRESO",
              estado: "Completado",
              usuarioId: currentUser.id,
              categoriaId: savingCategory.id,
            });
          }
        }
      }

      toast.success("Meta actualizada correctamente");
      await fetchAllData(currentUser);
    } catch (error) {
      console.error("Error al actualizar meta:", error);
      toast.error(error.message || "Error al actualizar la meta.");
    }
  };

  const deleteGoal = async (id) => {
    try {
      await api.delete(`/metas/${id}`);
      toast.success("Meta eliminada con éxito");
      await fetchAllData(currentUser);
    } catch (error) {
      console.error("Error al eliminar meta:", error);
      toast.error(error.message || "Error al eliminar la meta.");
    }
  };

  const addFundsToGoal = async (id, amount) => {
    try {
      if (!currentUser) throw new Error("Usuario no autenticado");

      const targetGoal = goals.find((g) => g.id === id);
      if (!targetGoal) throw new Error("La meta seleccionada ya no existe.");

      const positiveAmount = Number(amount);
      if (isNaN(positiveAmount) || positiveAmount <= 0) {
        throw new Error("Por favor ingresa un monto válido mayor a cero.");
      }

      const remainingNeeded = targetGoal.target - targetGoal.current;
      if (positiveAmount > remainingNeeded) {
        throw new Error(`El monto ($${positiveAmount}) supera lo requerido para completar la meta ($${remainingNeeded})`);
      }

      // 1. PATCH funds on backend
      await api.patch(`/metas/${id}/fondos`, { monto: positiveAmount });

      // 2. Create the supporting saving transaction
      const savingCategory = await getOrCreateCategory("Ahorro", "expense");
      await api.post("/transacciones", {
        descripcion: `Aporte Ahorro: ${targetGoal.name}`,
        monto: Number(positiveAmount.toFixed(2)),
        tipo: "GASTO",
        categoriaId: savingCategory.id,
        fecha: new Date().toISOString().split("T")[0],
        estado: "Completado",
        usuarioId: currentUser.id,
      });

      toast.success(`Se aportó $${positiveAmount.toLocaleString()} a la meta "${targetGoal.name}"`);
      await fetchAllData(currentUser);
    } catch (error) {
      console.error("Error al aportar fondos:", error);
      toast.error(error.message || "Error al aportar fondos.");
    }
  };

  const updateAutoSaveRule = (rule) => {
    try {
      const rateValue = Number(rule.value);
      if (rule.enabled) {
        if (isNaN(rateValue) || rateValue <= 0) {
          throw new Error("El valor de ahorro automático debe ser mayor a cero.");
        }
        if (rule.type === "percent" && rateValue > 100) {
          throw new Error("El porcentaje de ahorro automático no puede exceder el 100%.");
        }
      }
      const safeValue = isNaN(rateValue) ? 0 : Number(rateValue.toFixed(2));
      setAutoSaveRule({
        ...rule,
        value: safeValue,
      });
      toast.success("Regla de ahorro automático guardada");
    } catch (error) {
      console.error("Error al guardar regla de ahorro automático:", error);
      toast.error(error.message || "Error al guardar la regla.");
    }
  };

  const deleteUser = async (id) => {
    try {
      await api.delete(`/usuarios/${id}`);
      toast.success("Cuenta de usuario eliminada correctamente");
      if (currentUser && currentUser.id === String(id)) {
        setCurrentUser(null);
      }
      await fetchUsers();
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      toast.error("No se pudo eliminar el usuario de la base de datos.");
    }
  };

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        goals,
        autoSaveRule,
        currentUser,
        setCurrentUser,
        loginUser,
        registerUser,
        triggerTransition,
        isTransitioning,
        transitionStep,
        transitionUser,
        allAccounts,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        addGoal,
        updateGoal,
        deleteGoal,
        addFundsToGoal,
        updateAutoSaveRule,
        deleteUser,
        clearUserData,
        fetchAllData,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error("useFinance must be used within a FinanceProvider");
  }
  return context;
}
