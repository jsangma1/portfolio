import { motion } from "framer-motion";
import SkillCarousel from "./SkillCarousel";

export default function Skills() {
  return (
    <section
      id="skills"
      className="flex justify-center px-10 py-8"
      style={{ backgroundColor: "#000" }}
    >
      <motion.div
        className="rounded-[20px] flex flex-col items-center text-center"
        style={{
          backgroundColor: "#E3E3E3",
          maxWidth: "1385px",
          width: "100%",
          padding: "20px",
        }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
   <h2
  className="font-poppins font-bold text-[24px] mb-2"
  style={{
    color: "#000",
    textShadow: "4px 4px 4px rgba(255, 255, 255, 1)",
  }}
>
  Skills
</h2>



        <div
          style={{
            height: "50px", // increased height for images
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <SkillCarousel />
        </div>
      </motion.div>
    </section>
  );
}
