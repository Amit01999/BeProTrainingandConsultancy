"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// server/db.ts
var db_exports = {};
__export(db_exports, {
  connectMongo: () => connectMongo,
  default: () => db_default,
  mongo: () => mongo
});
async function connectMongo() {
  if (!process.env.MONGO_URL) {
    console.error("MONGO_URL environment variable is not set!");
    throw new Error(
      "MONGO_URL must be set. Did you forget to provision a MongoDB database?"
    );
  }
  if (cached.conn) {
    console.log("Using cached MongoDB connection");
    return cached.conn;
  }
  if (!cached.promise) {
    console.log("Creating new MongoDB connection...");
    const opts = {
      dbName: process.env.MONGO_DB_NAME,
      bufferCommands: false
      // Disable buffering in serverless
    };
    cached.promise = import_mongoose5.default.connect(process.env.MONGO_URL, opts).then((mongoose2) => {
      console.log("MongoDB connected successfully");
      return mongoose2;
    }).catch((error) => {
      console.error("MongoDB connection error:", error);
      throw error;
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
  return cached.conn;
}
var import_mongoose5, cached, mongo, db_default;
var init_db = __esm({
  "server/db.ts"() {
    "use strict";
    import_mongoose5 = __toESM(require("mongoose"), 1);
    import_mongoose5.default.set("strictQuery", true);
    cached = global.mongoose;
    if (!cached) {
      cached = global.mongoose = { conn: null, promise: null };
    }
    mongo = import_mongoose5.default;
    db_default = mongo;
  }
});

// src/api/index.ts
var index_exports = {};
__export(index_exports, {
  default: () => handler,
  log: () => log
});
module.exports = __toCommonJS(index_exports);
var import_express = __toESM(require("express"), 1);

// server/models/user.model.ts
var import_mongoose = require("mongoose");
var userSchema = new import_mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "student"], default: "student" },
    fullName: { type: String, required: true },
    email: { type: String },
    phone: { type: String }
  },
  { timestamps: { createdAt: "createdAt", updatedAt: false } }
);
var UserModel = (0, import_mongoose.model)("User", userSchema);

// server/models/course.model.ts
var import_mongoose2 = require("mongoose");
var courseSchema = new import_mongoose2.Schema(
  {
    title: { type: String, required: true },
    titleBn: { type: String },
    category: { type: String, required: true },
    level: { type: String },
    duration: { type: String },
    fee: { type: String },
    description: { type: String },
    descriptionBn: { type: String },
    features: { type: [String], default: [] },
    isFeatured: { type: Boolean, default: false }
  },
  { timestamps: { createdAt: "createdAt", updatedAt: false } }
);
var CourseModel = (0, import_mongoose2.model)("Course", courseSchema);

// server/models/application.model.ts
var import_mongoose3 = require("mongoose");
var applicationSchema = new import_mongoose3.Schema(
  {
    userId: { type: import_mongoose3.Schema.Types.ObjectId, ref: "User", required: false },
    courseId: {
      type: import_mongoose3.Schema.Types.ObjectId,
      ref: "Course",
      required: true
    },
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: false },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    }
  },
  { timestamps: { createdAt: "appliedAt", updatedAt: false } }
);
var ApplicationModel = (0, import_mongoose3.model)(
  "Application",
  applicationSchema
);

// server/models/contact.model.ts
var import_mongoose4 = require("mongoose");
var contactSchema = new import_mongoose4.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    message: { type: String, required: true }
  },
  { timestamps: { createdAt: "createdAt", updatedAt: false } }
);
var ContactModel = (0, import_mongoose4.model)("Contact", contactSchema);

// server/storage.ts
var DatabaseStorage = class {
  async getUser(id) {
    const user = await UserModel.findById(id).lean();
    if (!user) return void 0;
    return {
      _id: String(user._id),
      id: String(user._id),
      username: user.username,
      password: user.password,
      role: user.role,
      fullName: user.fullName,
      email: user.email ?? null,
      phone: user.phone ?? null,
      createdAt: user.createdAt?.toISOString() ?? (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  async getUserByUsername(username) {
    const user = await UserModel.findOne({ username }).lean();
    if (!user) return void 0;
    return {
      _id: String(user._id),
      id: String(user._id),
      username: user.username,
      password: user.password,
      role: user.role,
      fullName: user.fullName,
      email: user.email ?? null,
      phone: user.phone ?? null,
      createdAt: user.createdAt?.toISOString() ?? (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  async createUser(insertUser) {
    const created = await UserModel.create(insertUser);
    return {
      _id: String(created._id),
      id: String(created._id),
      username: created.username,
      password: created.password,
      role: created.role,
      fullName: created.fullName,
      email: created.email ?? null,
      phone: created.phone ?? null,
      createdAt: created.createdAt?.toISOString() ?? (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  async getCourses(category) {
    const filter = {};
    if (category) filter.category = category;
    const courses = await CourseModel.find(filter).sort({ createdAt: -1 }).lean();
    return courses.map((c) => ({
      _id: String(c._id),
      id: String(c._id),
      title: c.title,
      titleBn: c.titleBn ?? null,
      category: c.category,
      level: c.level ?? null,
      duration: c.duration ?? null,
      fee: c.fee ?? null,
      description: c.description ?? null,
      descriptionBn: c.descriptionBn ?? null,
      features: c.features ?? [],
      isFeatured: c.isFeatured ?? false,
      createdAt: c.createdAt?.toISOString() ?? (/* @__PURE__ */ new Date()).toISOString()
    }));
  }
  async getCourse(id) {
    const c = await CourseModel.findById(id).lean();
    if (!c) return void 0;
    return {
      _id: String(c._id),
      id: String(c._id),
      title: c.title,
      titleBn: c.titleBn ?? null,
      category: c.category,
      level: c.level ?? null,
      duration: c.duration ?? null,
      fee: c.fee ?? null,
      description: c.description ?? null,
      descriptionBn: c.descriptionBn ?? null,
      features: c.features ?? [],
      isFeatured: c.isFeatured ?? false,
      createdAt: c.createdAt?.toISOString() ?? (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  async createCourse(insertCourse) {
    const created = await CourseModel.create(insertCourse);
    return {
      _id: String(created._id),
      id: String(created._id),
      title: created.title,
      titleBn: created.titleBn ?? null,
      category: created.category,
      level: created.level ?? null,
      duration: created.duration ?? null,
      fee: created.fee ?? null,
      description: created.description ?? null,
      descriptionBn: created.descriptionBn ?? null,
      features: created.features ?? [],
      isFeatured: created.isFeatured ?? false,
      createdAt: created.createdAt?.toISOString() ?? (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  async updateCourse(id, updates) {
    const updated = await CourseModel.findByIdAndUpdate(id, updates, {
      new: true
    }).lean();
    if (!updated) throw new Error("Course not found");
    return {
      _id: String(updated._id),
      id: String(updated._id),
      title: updated.title,
      titleBn: updated.titleBn ?? null,
      category: updated.category,
      level: updated.level ?? null,
      duration: updated.duration ?? null,
      fee: updated.fee ?? null,
      description: updated.description ?? null,
      descriptionBn: updated.descriptionBn ?? null,
      features: updated.features ?? [],
      isFeatured: updated.isFeatured ?? false,
      createdAt: updated.createdAt?.toISOString() ?? (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  async deleteCourse(id) {
    await CourseModel.findByIdAndDelete(id);
  }
  async createApplication(insertApp) {
    const created = await ApplicationModel.create(insertApp);
    return {
      _id: String(created._id),
      id: String(created._id),
      userId: created.userId ? String(created.userId) : null,
      courseId: String(created.courseId),
      fullName: created.fullName,
      phone: created.phone,
      email: created.email ?? null,
      status: created.status,
      appliedAt: created.appliedAt?.toISOString() ?? (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  async getApplications() {
    const apps = await ApplicationModel.find().populate("courseId").populate("userId").sort({ appliedAt: -1 }).lean();
    return apps.map((a) => ({
      _id: String(a._id),
      id: String(a._id),
      userId: a.userId ? String(a.userId._id) : null,
      courseId: String(a.courseId._id),
      fullName: a.fullName,
      phone: a.phone,
      email: a.email ?? null,
      status: a.status,
      appliedAt: a.appliedAt?.toISOString() ?? (/* @__PURE__ */ new Date()).toISOString(),
      course: {
        _id: String(a.courseId._id),
        id: String(a.courseId._id),
        title: a.courseId.title,
        category: a.courseId.category,
        level: a.courseId.level ?? null,
        duration: a.courseId.duration ?? null,
        fee: a.courseId.fee ?? null,
        description: a.courseId.description ?? null,
        isFeatured: a.courseId.isFeatured ?? false,
        createdAt: a.courseId.createdAt?.toISOString() ?? (/* @__PURE__ */ new Date()).toISOString()
      },
      user: a.userId ? {
        _id: String(a.userId._id),
        id: String(a.userId._id),
        username: a.userId.username,
        password: a.userId.password,
        role: a.userId.role,
        fullName: a.userId.fullName,
        email: a.userId.email ?? null,
        phone: a.userId.phone ?? null,
        createdAt: a.userId.createdAt?.toISOString() ?? (/* @__PURE__ */ new Date()).toISOString()
      } : void 0
    }));
  }
  async getUserApplications(userId) {
    const apps = await ApplicationModel.find({ userId }).populate("courseId").sort({ appliedAt: -1 }).lean();
    return apps.map((a) => ({
      _id: String(a._id),
      userId: String(a.userId),
      courseId: String(a.courseId._id),
      fullName: a.fullName,
      phone: a.phone,
      email: a.email ?? null,
      status: a.status,
      appliedAt: a.appliedAt?.toISOString() ?? (/* @__PURE__ */ new Date()).toISOString(),
      course: {
        _id: String(a.courseId._id),
        title: a.courseId.title,
        category: a.courseId.category,
        level: a.courseId.level ?? null,
        duration: a.courseId.duration ?? null,
        fee: a.courseId.fee ?? null,
        description: a.courseId.description ?? null,
        isFeatured: a.courseId.isFeatured ?? false,
        createdAt: a.courseId.createdAt?.toISOString() ?? (/* @__PURE__ */ new Date()).toISOString()
      }
    }));
  }
  async updateApplicationStatus(id, status) {
    const updated = await ApplicationModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).lean();
    if (!updated) throw new Error("Application not found");
    return {
      _id: String(updated._id),
      userId: updated.userId ? String(updated.userId) : null,
      courseId: String(updated.courseId),
      fullName: updated.fullName,
      phone: updated.phone,
      email: updated.email ?? null,
      status: updated.status,
      appliedAt: updated.appliedAt?.toISOString() ?? (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  async createContact(insertContact) {
    const created = await ContactModel.create(insertContact);
    return {
      _id: String(created._id),
      id: String(created._id),
      name: created.name,
      email: created.email,
      phone: created.phone ?? null,
      message: created.message,
      createdAt: created.createdAt?.toISOString() ?? (/* @__PURE__ */ new Date()).toISOString()
    };
  }
};
var storage = new DatabaseStorage();

// shared/routes.ts
var import_zod2 = require("zod");

// shared/schema.ts
var import_zod = require("zod");
var insertUserSchema = import_zod.z.object({
  username: import_zod.z.string(),
  password: import_zod.z.string(),
  role: import_zod.z.enum(["admin", "student"]).optional().default("student"),
  fullName: import_zod.z.string(),
  email: import_zod.z.string().email().optional().nullable(),
  phone: import_zod.z.string().optional().nullable()
});
var insertCourseSchema = import_zod.z.object({
  title: import_zod.z.string(),
  titleBn: import_zod.z.string().optional().nullable(),
  category: import_zod.z.string(),
  level: import_zod.z.string().optional().nullable(),
  duration: import_zod.z.string().optional().nullable(),
  fee: import_zod.z.string().optional().nullable(),
  description: import_zod.z.string().optional().nullable(),
  descriptionBn: import_zod.z.string().optional().nullable(),
  features: import_zod.z.array(import_zod.z.string()).optional(),
  isFeatured: import_zod.z.boolean().optional()
});
var insertApplicationSchema = import_zod.z.object({
  userId: import_zod.z.string().optional().nullable(),
  courseId: import_zod.z.string(),
  fullName: import_zod.z.string().min(1, "Full name is required"),
  phone: import_zod.z.string().min(1, "Phone number is required"),
  email: import_zod.z.string().email().optional().nullable()
});
var insertContactSchema = import_zod.z.object({
  name: import_zod.z.string(),
  email: import_zod.z.string().email(),
  phone: import_zod.z.string().optional().nullable(),
  message: import_zod.z.string()
});

// shared/routes.ts
var errorSchemas = {
  validation: import_zod2.z.object({
    message: import_zod2.z.string(),
    field: import_zod2.z.string().optional()
  }),
  notFound: import_zod2.z.object({
    message: import_zod2.z.string()
  }),
  internal: import_zod2.z.object({
    message: import_zod2.z.string()
  }),
  unauthorized: import_zod2.z.object({
    message: import_zod2.z.string()
  })
};
var api = {
  auth: {
    register: {
      method: "POST",
      path: "/api/register",
      input: insertUserSchema,
      responses: {
        201: import_zod2.z.custom(),
        400: errorSchemas.validation
      }
    },
    login: {
      method: "POST",
      path: "/api/login",
      input: import_zod2.z.object({
        username: import_zod2.z.string(),
        password: import_zod2.z.string()
      }),
      responses: {
        200: import_zod2.z.custom(),
        401: errorSchemas.unauthorized
      }
    },
    logout: {
      method: "POST",
      path: "/api/logout",
      responses: {
        200: import_zod2.z.void()
      }
    },
    me: {
      method: "GET",
      path: "/api/user",
      responses: {
        200: import_zod2.z.custom(),
        401: errorSchemas.unauthorized
      }
    }
  },
  courses: {
    list: {
      method: "GET",
      path: "/api/courses",
      input: import_zod2.z.object({
        category: import_zod2.z.string().optional()
      }).optional(),
      responses: {
        200: import_zod2.z.array(import_zod2.z.custom())
      }
    },
    get: {
      method: "GET",
      path: "/api/courses/:id",
      responses: {
        200: import_zod2.z.custom(),
        404: errorSchemas.notFound
      }
    },
    create: {
      method: "POST",
      path: "/api/courses",
      input: insertCourseSchema,
      responses: {
        201: import_zod2.z.custom(),
        400: errorSchemas.validation,
        401: errorSchemas.unauthorized
      }
    },
    update: {
      method: "PUT",
      path: "/api/courses/:id",
      input: insertCourseSchema.partial(),
      responses: {
        200: import_zod2.z.custom(),
        404: errorSchemas.notFound,
        401: errorSchemas.unauthorized
      }
    },
    delete: {
      method: "DELETE",
      path: "/api/courses/:id",
      responses: {
        204: import_zod2.z.void(),
        404: errorSchemas.notFound,
        401: errorSchemas.unauthorized
      }
    }
  },
  applications: {
    create: {
      method: "POST",
      path: "/api/applications",
      input: insertApplicationSchema,
      responses: {
        201: import_zod2.z.custom(),
        400: errorSchemas.validation,
        401: errorSchemas.unauthorized
      }
    },
    list: {
      method: "GET",
      path: "/api/applications",
      responses: {
        200: import_zod2.z.array(import_zod2.z.custom()),
        401: errorSchemas.unauthorized
      }
    },
    updateStatus: {
      method: "PATCH",
      path: "/api/applications/:id/status",
      input: import_zod2.z.object({ status: import_zod2.z.enum(["pending", "approved", "rejected"]) }),
      responses: {
        200: import_zod2.z.custom(),
        404: errorSchemas.notFound,
        401: errorSchemas.unauthorized
      }
    }
  },
  contacts: {
    create: {
      method: "POST",
      path: "/api/contact",
      input: insertContactSchema,
      responses: {
        201: import_zod2.z.custom(),
        400: errorSchemas.validation
      }
    }
  }
};

// server/auth.ts
var import_crypto = require("crypto");
var import_util = require("util");
var import_passport = __toESM(require("passport"), 1);
var import_passport_local = require("passport-local");
var import_express_session = __toESM(require("express-session"), 1);
var import_connect_mongo = __toESM(require("connect-mongo"), 1);
var scryptAsync = (0, import_util.promisify)(import_crypto.scrypt);
var crypto = {
  hash: async (password) => {
    const salt = (0, import_crypto.randomBytes)(16).toString("hex");
    const buf = await scryptAsync(password, salt, 64);
    return `${buf.toString("hex")}.${salt}`;
  },
  compare: async (storedPassword, suppliedPassword) => {
    const [hashed, salt] = storedPassword.split(".");
    const hashedPasswordBuf = Buffer.from(hashed, "hex");
    const suppliedPasswordBuf = await scryptAsync(
      suppliedPassword,
      salt,
      64
    );
    return (0, import_crypto.timingSafeEqual)(hashedPasswordBuf, suppliedPasswordBuf);
  }
};
function setupAuth(app2) {
  const sessionSettings = {
    store: import_connect_mongo.default.create({
      mongoUrl: process.env.MONGO_URL,
      collectionName: "sessions"
    }),
    secret: process.env.SESSION_SECRET || "super secret session key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1e3,
      // 30 days
      secure: app2.get("env") === "production"
    }
  };
  if (app2.get("env") === "production") {
    app2.set("trust proxy", 1);
  }
  app2.use((0, import_express_session.default)(sessionSettings));
  app2.use(import_passport.default.initialize());
  app2.use(import_passport.default.session());
  import_passport.default.use(
    new import_passport_local.Strategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        if (!user || !await crypto.compare(user.password, password)) {
          return done(null, false);
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );
  import_passport.default.serializeUser((user, done) => done(null, user.id ?? user._id));
  import_passport.default.deserializeUser(async (id, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
  return crypto;
}

// server/routes.ts
var import_zod3 = require("zod");
var import_passport2 = __toESM(require("passport"), 1);
async function registerRoutes(httpServer, app2) {
  const crypto2 = setupAuth(app2);
  app2.post(api.auth.register.path, async (req, res, next) => {
    try {
      const existing = await storage.getUserByUsername(req.body.username);
      if (existing) {
        return res.status(400).json({ message: "Username already exists" });
      }
      const hashedPassword = await crypto2.hash(req.body.password);
      const user = await storage.createUser({
        ...req.body,
        password: hashedPassword
      });
      req.login(user, (err) => {
        if (err) return next(err);
        res.status(201).json(user);
      });
    } catch (err) {
      if (err instanceof import_zod3.z.ZodError) {
        res.status(400).json({ message: err.errors[0].message });
      } else {
        next(err);
      }
    }
  });
  app2.post(api.auth.login.path, (req, res, next) => {
    import_passport2.default.authenticate("local", (err, user, info) => {
      if (err) return next(err);
      if (!user)
        return res.status(401).json({ message: "Invalid credentials" });
      req.login(user, (err2) => {
        if (err2) return next(err2);
        res.status(200).json(user);
      });
    })(req, res, next);
  });
  app2.post(api.auth.logout.path, (req, res) => {
    req.logout(() => {
      res.status(200).send();
    });
  });
  app2.get(api.auth.me.path, (req, res) => {
    if (!req.user) return res.status(401).send();
    res.json(req.user);
  });
  const requireAuth = (req, res, next) => {
    if (!req.isAuthenticated()) return res.status(401).send();
    next();
  };
  const requireAdmin = (req, res, next) => {
    if (!req.isAuthenticated() || req.user.role !== "admin")
      return res.status(401).send();
    next();
  };
  app2.get(api.courses.list.path, async (req, res) => {
    const category = req.query.category;
    const courses = await storage.getCourses(category);
    res.json(courses);
  });
  app2.get(api.courses.get.path, async (req, res) => {
    const course = await storage.getCourse(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  });
  app2.post(api.courses.create.path, requireAdmin, async (req, res) => {
    try {
      const input = api.courses.create.input.parse(req.body);
      const course = await storage.createCourse(input);
      res.status(201).json(course);
    } catch (err) {
      if (err instanceof import_zod3.z.ZodError)
        res.status(400).json({ message: err.errors[0].message });
      else throw err;
    }
  });
  app2.put(api.courses.update.path, requireAdmin, async (req, res) => {
    const course = await storage.updateCourse(req.params.id, req.body);
    res.json(course);
  });
  app2.delete(api.courses.delete.path, requireAdmin, async (req, res) => {
    await storage.deleteCourse(req.params.id);
    res.status(204).send();
  });
  app2.post(api.applications.create.path, async (req, res) => {
    try {
      const input = api.applications.create.input.parse({
        ...req.body,
        userId: req.user?.id || null,
        email: req.body.email || req.user?.email || null
      });
      const app3 = await storage.createApplication(input);
      res.status(201).json(app3);
    } catch (err) {
      if (err instanceof import_zod3.z.ZodError) {
        res.status(400).json({ message: err.errors[0].message });
      } else {
        throw err;
      }
    }
  });
  app2.get(api.applications.list.path, requireAdmin, async (req, res) => {
    const apps = await storage.getApplications();
    res.json(apps);
  });
  app2.patch(
    api.applications.updateStatus.path,
    requireAdmin,
    async (req, res) => {
      const app3 = await storage.updateApplicationStatus(
        req.params.id,
        req.body.status
      );
      res.json(app3);
    }
  );
  app2.post(api.contacts.create.path, async (req, res) => {
    const input = api.contacts.create.input.parse(req.body);
    const contact = await storage.createContact(input);
    res.status(201).json(contact);
  });
  if (process.env.NODE_ENV !== "production") {
    const existingCourses = await storage.getCourses();
    if (existingCourses.length === 0) {
      console.log("Seeding database...");
      const adminPassword = await crypto2.hash("admin123");
      await storage.createUser({
        username: "admin",
        password: adminPassword,
        role: "admin",
        fullName: "System Admin",
        email: "admin@bepro.com",
        phone: "01995-555588"
      });
      await storage.createCourse({
        title: "Graphic Design",
        titleBn: "\u0997\u09CD\u09B0\u09BE\u09AB\u09BF\u0995 \u09A1\u09BF\u099C\u09BE\u0987\u09A8",
        category: "NSDA",
        level: "L-2",
        duration: "\u09E8\u09EA \u09A6\u09BF\u09A8",
        fee: "Free",
        description: "Professional graphic design training with industry-standard tools including Adobe Photoshop, Illustrator, and InDesign. NSDA certified course with job placement support.",
        descriptionBn: "\u0985\u09CD\u09AF\u09BE\u09A1\u09CB\u09AC\u09BF \u09AB\u099F\u09CB\u09B6\u09AA, \u0987\u09B2\u09BE\u09B8\u09CD\u099F\u09CD\u09B0\u09C7\u099F\u09B0 \u098F\u09AC\u0982 \u0987\u09A8\u09A1\u09BF\u099C\u09BE\u0987\u09A8 \u09B8\u09B9 \u09B6\u09BF\u09B2\u09CD\u09AA-\u09AE\u09BE\u09A8\u09C7\u09B0 \u09B8\u09B0\u099E\u09CD\u099C\u09BE\u09AE \u09A6\u09BF\u09AF\u09BC\u09C7 \u09AA\u09C7\u09B6\u09BE\u09A6\u09BE\u09B0 \u0997\u09CD\u09B0\u09BE\u09AB\u09BF\u0995 \u09A1\u09BF\u099C\u09BE\u0987\u09A8 \u09AA\u09CD\u09B0\u09B6\u09BF\u0995\u09CD\u09B7\u09A3\u0964",
        features: ["Adobe Suite Training", "Portfolio Development", "NSDA Certificate", "Job Placement Support"],
        isFeatured: true
      });
      await storage.createCourse({
        title: "Graphic Design Soft Training",
        titleBn: "\u0997\u09CD\u09B0\u09BE\u09AB\u09BF\u0995 \u09A1\u09BF\u099C\u09BE\u0987\u09A8 \u09B8\u09AB\u099F \u099F\u09CD\u09B0\u09C7\u09A8\u09BF\u0982",
        category: "NSDA",
        level: "L-3",
        duration: "\u09E8\u09EA \u09A6\u09BF\u09A8",
        fee: "Free",
        description: "Advanced graphic design skills combined with soft skills integration for enhanced career success. Includes advanced typography, branding, and client communication.",
        descriptionBn: "\u0989\u09A8\u09CD\u09A8\u09A4 \u099F\u09BE\u0987\u09AA\u09CB\u0997\u09CD\u09B0\u09BE\u09AB\u09BF, \u09AC\u09CD\u09B0\u09CD\u09AF\u09BE\u09A8\u09CD\u09A1\u09BF\u0982 \u098F\u09AC\u0982 \u0995\u09CD\u09B2\u09BE\u09AF\u09BC\u09C7\u09A8\u09CD\u099F \u09AF\u09CB\u0997\u09BE\u09AF\u09CB\u0997 \u09B8\u09B9 \u0989\u09A8\u09CD\u09A8\u09A4 \u0997\u09CD\u09B0\u09BE\u09AB\u09BF\u0995 \u09A1\u09BF\u099C\u09BE\u0987\u09A8 \u09A6\u0995\u09CD\u09B7\u09A4\u09BE\u0964",
        features: ["Advanced Design Techniques", "Branding & Identity", "Client Communication", "Soft Skills Integration"]
      });
      await storage.createCourse({
        title: "Digital Marketing Soft Training",
        titleBn: "\u09A1\u09BF\u099C\u09BF\u099F\u09BE\u09B2 \u09AE\u09BE\u09B0\u09CD\u0995\u09C7\u099F\u09BF\u0982 \u09B8\u09AB\u099F \u099F\u09CD\u09B0\u09C7\u09A8\u09BF\u0982",
        category: "NSDA",
        level: "L-3",
        duration: "\u09E8\u09EA \u09A6\u09BF\u09A8",
        fee: "Free",
        description: "Complete digital marketing training covering SEO, social media marketing, Google Ads, content marketing, and analytics with soft skills development.",
        descriptionBn: "\u098F\u09B8\u0987\u0993, \u09B8\u09CB\u09B6\u09CD\u09AF\u09BE\u09B2 \u09AE\u09BF\u09A1\u09BF\u09AF\u09BC\u09BE \u09AE\u09BE\u09B0\u09CD\u0995\u09C7\u099F\u09BF\u0982, \u0997\u09C1\u0997\u09B2 \u0985\u09CD\u09AF\u09BE\u09A1\u09B8, \u0995\u09A8\u09CD\u099F\u09C7\u09A8\u09CD\u099F \u09AE\u09BE\u09B0\u09CD\u0995\u09C7\u099F\u09BF\u0982 \u098F\u09AC\u0982 \u0985\u09CD\u09AF\u09BE\u09A8\u09BE\u09B2\u09BF\u099F\u09BF\u0995\u09CD\u09B8 \u09B8\u09AE\u09CD\u09AA\u09C2\u09B0\u09CD\u09A3 \u09A1\u09BF\u099C\u09BF\u099F\u09BE\u09B2 \u09AE\u09BE\u09B0\u09CD\u0995\u09C7\u099F\u09BF\u0982 \u09AA\u09CD\u09B0\u09B6\u09BF\u0995\u09CD\u09B7\u09A3\u0964",
        features: ["SEO & SEM", "Social Media Marketing", "Google Analytics", "Content Strategy"],
        isFeatured: true
      });
      await storage.createCourse({
        title: "Entrepreneurship Development Training",
        titleBn: "\u0989\u09A6\u09CD\u09AF\u09CB\u0995\u09CD\u09A4\u09BE \u0989\u09A8\u09CD\u09A8\u09AF\u09BC\u09A8 \u09AA\u09CD\u09B0\u09B6\u09BF\u0995\u09CD\u09B7\u09A3",
        category: "Professional",
        duration: "\u09ED \u09A6\u09BF\u09A8",
        fee: "\u09F3\u09E8,\u09E6\u09E6\u09E6",
        description: "Learn to start and grow your own business with practical entrepreneurship skills. Covers business planning, financial management, marketing, and legal requirements.",
        descriptionBn: "\u09AC\u09CD\u09AF\u09AC\u09B8\u09BE \u09AA\u09B0\u09BF\u0995\u09B2\u09CD\u09AA\u09A8\u09BE, \u0986\u09B0\u09CD\u09A5\u09BF\u0995 \u09AC\u09CD\u09AF\u09AC\u09B8\u09CD\u09A5\u09BE\u09AA\u09A8\u09BE, \u09AE\u09BE\u09B0\u09CD\u0995\u09C7\u099F\u09BF\u0982 \u098F\u09AC\u0982 \u0986\u0987\u09A8\u09BF \u09AA\u09CD\u09B0\u09AF\u09BC\u09CB\u099C\u09A8\u09C0\u09AF\u09BC\u09A4\u09BE \u09B8\u09B9 \u09A8\u09BF\u099C\u09C7\u09B0 \u09AC\u09CD\u09AF\u09AC\u09B8\u09BE \u09B6\u09C1\u09B0\u09C1 \u0995\u09B0\u09C1\u09A8\u0964",
        features: ["Business Planning", "Financial Management", "Marketing Strategy", "Legal Compliance"]
      });
      await storage.createCourse({
        title: "Corporate Training",
        titleBn: "\u0995\u09B0\u09CD\u09AA\u09CB\u09B0\u09C7\u099F \u099F\u09CD\u09B0\u09C7\u09A8\u09BF\u0982",
        category: "Corporate",
        duration: "Custom",
        fee: "Contact Us",
        description: "Tailored training programs for NGOs, banks, hospitals, and corporate organizations. Includes office etiquette, communication, and emotional intelligence.",
        descriptionBn: "\u098F\u09A8\u099C\u09BF\u0993, \u09AC\u09CD\u09AF\u09BE\u0982\u0995, \u09B9\u09BE\u09B8\u09AA\u09BE\u09A4\u09BE\u09B2 \u098F\u09AC\u0982 \u0995\u09B0\u09CD\u09AA\u09CB\u09B0\u09C7\u099F \u09B8\u0982\u09B8\u09CD\u09A5\u09BE\u0997\u09C1\u09B2\u09BF\u09B0 \u099C\u09A8\u09CD\u09AF \u0995\u09BE\u09B8\u09CD\u099F\u09AE\u09BE\u0987\u099C\u09A1 \u09AA\u09CD\u09B0\u09B6\u09BF\u0995\u09CD\u09B7\u09A3 \u09AA\u09CD\u09B0\u09CB\u0997\u09CD\u09B0\u09BE\u09AE\u0964",
        features: ["Office Etiquette", "Professional Communication", "Team Building", "Leadership Skills"]
      });
      await storage.createCourse({
        title: "Foreign Job Orientation",
        titleBn: "\u09AC\u09BF\u09A6\u09C7\u09B6 \u099A\u09BE\u0995\u09B0\u09BF \u0993\u09B0\u09BF\u09AF\u09BC\u09C7\u09A8\u09CD\u099F\u09C7\u09B6\u09A8",
        category: "Professional",
        duration: "\u09ED \u09A6\u09BF\u09A8",
        fee: "\u09F3\u09E8,\u09E6\u09E6\u09E6",
        description: "Comprehensive preparation for overseas job seekers including CV writing, interview skills, basic English, and cultural orientation.",
        descriptionBn: "\u09B8\u09BF\u09AD\u09BF \u09B2\u09C7\u0996\u09BE, \u0987\u09A8\u09CD\u099F\u09BE\u09B0\u09AD\u09BF\u0989 \u09A6\u0995\u09CD\u09B7\u09A4\u09BE, \u09AC\u09C7\u09B8\u09BF\u0995 \u0987\u0982\u09B0\u09C7\u099C\u09BF \u098F\u09AC\u0982 \u09B8\u09BE\u0982\u09B8\u09CD\u0995\u09C3\u09A4\u09BF\u0995 \u0993\u09B0\u09BF\u09AF\u09BC\u09C7\u09A8\u09CD\u099F\u09C7\u09B6\u09A8 \u09B8\u09B9 \u09AC\u09BF\u09A6\u09C7\u09B6\u09C0 \u099A\u09BE\u0995\u09B0\u09BF \u09AA\u09CD\u09B0\u09B8\u09CD\u09A4\u09C1\u09A4\u09BF\u0964",
        features: ["CV Writing", "Interview Preparation", "Basic English", "Cultural Training"]
      });
      await storage.createCourse({
        title: "Language Training",
        titleBn: "\u09AD\u09BE\u09B7\u09BE \u09AA\u09CD\u09B0\u09B6\u09BF\u0995\u09CD\u09B7\u09A3",
        category: "Language",
        duration: "\u09E9\u09E6 \u09A6\u09BF\u09A8",
        fee: "\u09F3\u09EB,\u09E6\u09E6\u09E6 (German)",
        description: "Professional English and German language training for career advancement and overseas opportunities.",
        descriptionBn: "\u0995\u09CD\u09AF\u09BE\u09B0\u09BF\u09AF\u09BC\u09BE\u09B0 \u0989\u09A8\u09CD\u09A8\u09A4\u09BF \u098F\u09AC\u0982 \u09AC\u09BF\u09A6\u09C7\u09B6\u09C0 \u09B8\u09C1\u09AF\u09CB\u0997\u09C7\u09B0 \u099C\u09A8\u09CD\u09AF \u09AA\u09C7\u09B6\u09BE\u09A6\u09BE\u09B0 \u0987\u0982\u09B0\u09C7\u099C\u09BF \u098F\u09AC\u0982 \u099C\u09BE\u09B0\u09CD\u09AE\u09BE\u09A8 \u09AD\u09BE\u09B7\u09BE \u09AA\u09CD\u09B0\u09B6\u09BF\u0995\u09CD\u09B7\u09A3\u0964",
        features: ["Conversational Skills", "Business Language", "Grammar & Writing", "Cultural Context"],
        isFeatured: true
      });
      await storage.createCourse({
        title: "Higher Study Guidelines",
        titleBn: "\u0989\u099A\u09CD\u099A\u09B6\u09BF\u0995\u09CD\u09B7\u09BE \u0997\u09BE\u0987\u09A1\u09B2\u09BE\u0987\u09A8",
        category: "Professional",
        duration: "Consultation",
        fee: "Contact Us",
        description: "Expert guidance for students planning to pursue higher education abroad. Includes university selection, application process, and visa guidance.",
        descriptionBn: "\u09AC\u09BF\u09A6\u09C7\u09B6\u09C7 \u0989\u099A\u09CD\u099A\u09B6\u09BF\u0995\u09CD\u09B7\u09BE\u09B0 \u099C\u09A8\u09CD\u09AF \u09AA\u09B0\u09BF\u0995\u09B2\u09CD\u09AA\u09A8\u09BE\u0995\u09BE\u09B0\u09C0 \u09B6\u09BF\u0995\u09CD\u09B7\u09BE\u09B0\u09CD\u09A5\u09C0\u09A6\u09C7\u09B0 \u099C\u09A8\u09CD\u09AF \u09AC\u09BF\u09B6\u09C7\u09B7\u099C\u09CD\u099E \u0997\u09BE\u0987\u09A1\u09C7\u09A8\u09CD\u09B8\u0964",
        features: ["University Selection", "Application Assistance", "Visa Guidance", "Scholarship Info"]
      });
      console.log("Seeding complete!");
    }
  }
  return httpServer;
}

// src/api/index.ts
var app = (0, import_express.default)();
console.log("Environment check:", {
  hasMongoUrl: !!process.env.MONGO_URL,
  hasSessionSecret: !!process.env.SESSION_SECRET,
  nodeEnv: process.env.NODE_ENV
});
app.use(
  import_express.default.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    }
  })
);
app.use(import_express.default.urlencoded({ extended: false }));
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      log(logLine);
    }
  });
  next();
});
var isInitialized = false;
async function initializeApp() {
  if (isInitialized) return app;
  const { connectMongo: connectMongo2 } = await Promise.resolve().then(() => (init_db(), db_exports));
  await connectMongo2();
  await registerRoutes(null, app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    console.error(err);
  });
  isInitialized = true;
  return app;
}
async function handler(req, res) {
  try {
    console.log(`[${(/* @__PURE__ */ new Date()).toISOString()}] ${req.method} ${req.url}`);
    const app2 = await initializeApp();
    return app2(req, res);
  } catch (error) {
    console.error("Handler error:", {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    return res.status(500).json({
      message: "Internal Server Error",
      error: process.env.NODE_ENV === "development" ? error.message : void 0
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  log
});
